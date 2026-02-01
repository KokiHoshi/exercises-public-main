import { test, expect } from "@playwright/test";

const APP_PATH = "http://localhost:3000/ch15.11-15/ex04/";

function todoItem(page, title) {
  return page.locator("#todo-list li", { hasText: title });
}

async function addTodo(page, title) {
  await page.locator("#new-todo").fill(title);
  await page.locator("#new-todo-form button").click();
  await expect(todoItem(page, title)).toBeVisible({ timeout: 3000 });
}

async function setCompleted(page, title, completed) {
  const item = todoItem(page, title);
  const checkbox = item.locator('input[type="checkbox"]');
  if (completed) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  } else {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }
}

/**
 * localStorage を「使えない」状態にする（例外を投げる getter）
 * アプリ側の isStorageAvailable() が try/catch で false になり、
 * メモリだけで動くことを確認できる。
 */
async function makeLocalStorageUnavailable(context) {
  await context.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("localStorage disabled");
      },
    });
  });
}

/**
 * ページ内の JS エラーを拾ってテスト失敗にする（「エラーが表示されない」要件の確認に便利）
 */
function failOnPageErrors(page) {
  page.on("pageerror", (err) => {
    throw err;
  });
}

test("リロードしても ToDo/チェック状態が残る", async ({ page }) => {
  failOnPageErrors(page);

  await page.goto(APP_PATH);

  const title = `todo-${Date.now()}`;
  await addTodo(page, title);
  await setCompleted(page, title, true);

  // リロード
  await page.reload();

  // ToDo が残る + チェック状態が残る
  const item = todoItem(page, title);
  await expect(item).toBeVisible();
  await expect(item.locator('input[type="checkbox"]')).toBeChecked();
});

test("タブAで変更 → タブBが自動反映される（storageイベント）", async ({
  context,
}) => {
  const pageA = await context.newPage();
  const pageB = await context.newPage();
  failOnPageErrors(pageA);
  failOnPageErrors(pageB);

  await pageA.goto(APP_PATH);
  await pageB.goto(APP_PATH);

  const title = `sync-${Date.now()}`;

  // Aで追加
  await addTodo(pageA, title);

  // Bに自動反映される（storageイベントは「他タブ」で発火）
  await expect(todoItem(pageB, title)).toBeVisible();
});

test("localStorage無効でもエラーなしでCRUDできる（このタブ内だけ）", async ({
  browser,
}) => {
  const context = await browser.newContext();
  await makeLocalStorageUnavailable(context);
  const page = await context.newPage();
  failOnPageErrors(page);

  await page.goto(APP_PATH);

  const title = `mem-${Date.now()}`;

  // Create
  await addTodo(page, title);

  // Update (チェック)
  await setCompleted(page, title, true);

  // Delete
  const item = todoItem(page, title);
  await item.locator("button").click();
  await expect(item).toHaveCount(0);
});

test("localStorage無効では永続化・タブ同期しなくてもOK（＝しないことを確認）", async ({
  browser,
}) => {
  // localStorage を無効化した context（＝タブ間で storage が動かない）
  const context = await browser.newContext();
  await makeLocalStorageUnavailable(context);

  const pageA = await context.newPage();
  const pageB = await context.newPage();
  failOnPageErrors(pageA);
  failOnPageErrors(pageB);

  await pageA.goto(APP_PATH);
  await pageB.goto(APP_PATH);

  const title = `no-store-${Date.now()}`;

  // Aで追加（メモリ上だけ）
  await addTodo(pageA, title);

  // Bに反映されない（少し待っても出てこないことを確認）
  await pageB.waitForTimeout(500);
  await expect(todoItem(pageB, title)).toHaveCount(0);

  // Aをリロードしたら消えてOK（永続化しない想定）
  await pageA.reload();
  await expect(todoItem(pageA, title)).toHaveCount(0);
});
