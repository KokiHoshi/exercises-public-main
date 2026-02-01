const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// チャットの履歴を保持
const messages = [];

// ユーザーメッセージを追加する関数
function addUserMessage(content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-label user-label">You:</div>
        <div>${escapeHtml(content)}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// アシスタントメッセージを追加する関数
function addAssistantMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    messageDiv.innerHTML = `
        <div class="message-label assistant-label">Assistant:</div>
        <div class="content"></div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv.querySelector('.content');
}

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// メッセージを送信する関数
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // ユーザーメッセージを追加
    addUserMessage(message);
    messages.push({ role: 'user', content: message });

    // 入力欄をクリア
    userInput.value = '';

    // ボタンを無効化
    sendButton.disabled = true;
    userInput.disabled = true;

    // アシスタントメッセージの領域を作成
    const assistantContent = addAssistantMessage();
    let responseText = '';

    try {
        // Ollama APIにリクエストを送信
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemma:2b',
                messages: messages,
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // ストリーミングレスポンスを処理
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // チャンクをデコード
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                try {
                    const data = JSON.parse(line);

                    // メッセージのコンテンツを取得
                    if (data.message && data.message.content) {
                        responseText += data.message.content;
                        assistantContent.textContent = responseText;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }

                    // ストリームの終了を検知
                    if (data.done) {
                        break;
                    }
                } catch (e) {
                    console.error('JSON parse error:', e);
                }
            }
        }

        // アシスタントの応答を履歴に追加
        messages.push({ role: 'assistant', content: responseText });

    } catch (error) {
        console.error('Error:', error);
        assistantContent.textContent = `エラーが発生しました: ${error.message}`;
        assistantContent.style.color = 'red';
    } finally {
        // ボタンを有効化
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// イベントリスナーを設定
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 初期フォーカス
userInput.focus();
