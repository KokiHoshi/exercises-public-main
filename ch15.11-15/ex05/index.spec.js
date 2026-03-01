import { test, expect } from "@playwright/test";

const APP_URL = "http://localhost:3000/ch15.11-15/ex05/";
const DB_NAME = "TodoDB";

function todoItem(page, title) {
  return page.locator("#todo-list li", { hasText: title });
}

async function addTodo(page, title) {
  await page.locator("#new-todo").fill(title);
  await page.locator("#new-todo-form button[type=submit]").click();
  await expect(todoItem(page, title)).toBeVisible();
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
  // IndexedDB更新完了を待つ（data-saving が消えるまで）
  await expect(item).not.toHaveAttribute("data-saving", "true");
}

async function deleteTodo(page, title) {
  const item = todoItem(page, title);
  await item.locator("button").click();
  await expect(item).toHaveCount(0);
}

async function resetIndexedDB(page) {
  await page.goto(APP_URL);
  await page.evaluate((dbName) => {
    return new Promise((resolve) => {
      const req = indexedDB.deleteDatabase(dbName);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
      req.onblocked = () => resolve();
    });
  }, DB_NAME);
  await page.reload();
}

function failOnPageErrors(page) {
  page.on("pageerror", (err) => {
    throw err;
  });
}

test("リロードしても ToDo/チェック状態が残る（IndexedDB）", async ({
  page,
}) => {
  failOnPageErrors(page);
  await resetIndexedDB(page);

  const title = `todo-${Date.now()}`;
  await addTodo(page, title);
  await setCompleted(page, title, true);

  await page.reload();

  const item = todoItem(page, title);
  await expect(item).toBeVisible();
  await expect(item.locator('input[type="checkbox"]')).toBeChecked();
});

test("一度閉じて再度開いても ToDo/チェック状態が残る（IndexedDB）", async ({
  context,
}) => {
  // 起動①
  const pageA = await context.newPage();
  failOnPageErrors(pageA);

  await resetIndexedDB(pageA);

  const title = `persist-${Date.now()}`;
  await addTodo(pageA, title);
  await setCompleted(pageA, title, true);

  // 「閉じる」（タブを閉じる想定）
  await pageA.close();

  // 起動②（同一プロファイルで新しいタブを開く想定）
  const pageB = await context.newPage();
  failOnPageErrors(pageB);

  await pageB.goto(APP_URL);

  const item = todoItem(pageB, title);
  await expect(item).toBeVisible();
  await expect(item.locator('input[type="checkbox"]')).toBeChecked();

  await pageB.close();
});

test("タブAで変更 → タブBが自動反映される（BroadcastChannel）", async ({
  context,
}) => {
  const pageA = await context.newPage();
  const pageB = await context.newPage();
  failOnPageErrors(pageA);
  failOnPageErrors(pageB);

  await resetIndexedDB(pageA);
  await pageB.goto(APP_URL);

  const title = `sync-${Date.now()}`;

  // Aで追加
  await addTodo(pageA, title);
  await expect(todoItem(pageB, title)).toBeVisible();

  // Aで更新
  await setCompleted(pageA, title, true);
  await expect(
    todoItem(pageB, title).locator('input[type="checkbox"]'),
  ).toBeChecked();

  // Aで削除
  await deleteTodo(pageA, title);
  await expect(todoItem(pageB, title)).toHaveCount(0);
});
