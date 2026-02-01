// DOM要素の取得
const uploadForm = document.getElementById("uploadForm");
const accessTokenInput = document.getElementById("accessToken");
const fileNameInput = document.getElementById("fileName");
const fileInput = document.getElementById("file");
const fileInfoDiv = document.getElementById("fileInfo");
const uploadButton = document.getElementById("uploadButton");
const statusDiv = document.getElementById("status");

// ファイルが選択されたときの処理
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    fileInfoDiv.textContent = `選択されたファイル: ${file.name} (${sizeInMB} MB)`;
  } else {
    fileInfoDiv.textContent = "";
  }
});

// フォーム送信時の処理
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const accessToken = accessTokenInput.value.trim();
  const file = fileInput.files[0];
  const customFileName = fileNameInput.value.trim();

  if (!accessToken || !file) {
    showStatus("アクセストークンとファイルを選択してください", "error");
    return;
  }

  // ファイル名の決定
  const fileName = customFileName || file.name;

  // アップロード開始
  await uploadToOneDrive(accessToken, file, fileName);
});

/**
 * OneDriveにファイルをアップロードする
 * @param {string} accessToken - Microsoft Graph APIのアクセストークン
 * @param {File} file - アップロードするファイル
 * @param {string} fileName - OneDrive上でのファイル名
 */
async function uploadToOneDrive(accessToken, file, fileName) {
  try {
    // UIを無効化
    uploadButton.disabled = true;
    showStatus("アップロード中...", "loading");

    // ファイルサイズによってアップロード方法を変更
    // 4MB未満の場合は単純なアップロード、それ以上の場合はアップロードセッションを使用
    const FILE_SIZE_THRESHOLD = 4 * 1024 * 1024; // 4MB

    if (file.size < FILE_SIZE_THRESHOLD) {
      await simpleUpload(accessToken, file, fileName);
    } else {
      await resumableUpload(accessToken, file, fileName);
    }

    showStatus(
      `ファイル「${fileName}」がOneDriveに正常にアップロードされました！`,
      "success"
    );
  } catch (error) {
    console.error("Upload error:", error);
    showStatus(`アップロードエラー: ${error.message}`, "error");
  } finally {
    uploadButton.disabled = false;
  }
}

/**
 * 単純なアップロード（小さいファイル用）
 * @param {string} accessToken - アクセストークン
 * @param {File} file - アップロードするファイル
 * @param {string} fileName - ファイル名
 */
async function simpleUpload(accessToken, file, fileName) {
  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(
    fileName
  )}:/content`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `HTTP Error ${response.status}: ${response.statusText}`
    );
  }

  return await response.json();
}

/**
 * 再開可能なアップロード（大きいファイル用）
 * @param {string} accessToken - アクセストークン
 * @param {File} file - アップロードするファイル
 * @param {string} fileName - ファイル名
 */
async function resumableUpload(accessToken, file, fileName) {
  // 1. アップロードセッションを作成
  const createSessionUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(
    fileName
  )}:/createUploadSession`;

  const sessionResponse = await fetch(createSessionUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: {
        "@microsoft.graph.conflictBehavior": "replace",
        name: fileName,
      },
    }),
  });

  if (!sessionResponse.ok) {
    const errorData = await sessionResponse.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Failed to create upload session: ${sessionResponse.statusText}`
    );
  }

  const sessionData = await sessionResponse.json();
  const uploadUrl = sessionData.uploadUrl;

  // 2. ファイルをチャンクに分けてアップロード
  const chunkSize = 320 * 1024 * 10; // 3.2MB chunks (must be multiple of 320KB)
  const totalSize = file.size;
  let offset = 0;

  while (offset < totalSize) {
    const chunk = file.slice(offset, offset + chunkSize);
    const chunkEnd = Math.min(offset + chunkSize, totalSize);

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": chunk.size.toString(),
        "Content-Range": `bytes ${offset}-${chunkEnd - 1}/${totalSize}`,
      },
      body: chunk,
    });

    if (!uploadResponse.ok && uploadResponse.status !== 202) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
          `Failed to upload chunk: ${uploadResponse.statusText}`
      );
    }

    offset = chunkEnd;

    // 進捗を表示
    const progress = Math.round((offset / totalSize) * 100);
    showStatus(`アップロード中... ${progress}%`, "loading");
  }
}

/**
 * ステータスメッセージを表示
 * @param {string} message - 表示するメッセージ
 * @param {string} type - メッセージタイプ ('success', 'error', 'loading')
 */
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = "block";
}
