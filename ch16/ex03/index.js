import crypto from "crypto";
// ここを埋める
import fs from "fs"; // fs.promises を使う
import path from "path";

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  const keyBytes = crypto.randomBytes(32);
  return {
    value: keyBytes.toString("base64"), // JSONで扱いやすいように Base64 化して保存
  };
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // ここを埋める
  /** @type {crypto.Cipher} */
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key.value, "base64"),
    iv,
  );

  const encryptedBytes = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const encryptedBase64 = encryptedBytes.toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
  await fs.promises.writeFile(
    path.join(process.cwd(), "key.json"),
    JSON.stringify(key, null, 2),
    "utf8",
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  await fs.promises.writeFile(
    path.join(process.cwd(), "encrypted.json"),
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  const s = await fs.promises.readFile(
    path.join(process.cwd(), "key.json"),
    "utf8",
  );
  return JSON.parse(s);
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  const s = await fs.promises.readFile(
    path.join(process.cwd(), "encrypted.json"),
    "utf8",
  );
  return JSON.parse(s);
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
  const iv = Buffer.from(data.iv, "base64");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key.value, "base64"),
    iv,
  );

  const decryptedBytes = Buffer.concat([
    decipher.update(Buffer.from(data.value, "base64")),
    decipher.final(),
  ]);

  return decryptedBytes.toString("utf8");
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
