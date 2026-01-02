import { test, expect } from "@playwright/test";

test.describe("ex11 ToDo フィルタアプリ（E2E）", () => {
  test("フィルタ切替が動作し、完了切替・削除が表示に反映される", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/ch15.04-10/ex11/");

    const input = page.locator("#new-todo");
    const add = page.locator('button:has-text("Add")');

    // 追加
    await input.fill("A");
    await add.click();
    await input.fill("B");
    await add.click();

    // All に A,B が表示
    await expect(page.locator("#todo-list li")).toHaveCount(2);

    // A を完了（先頭のチェックボックス）
    const firstToggle = page
      .locator("#todo-list li")
      .first()
      .locator("input.toggle");
    await firstToggle.check();

    // Activeへ → Bだけ
    await page.click('footer a[href="#/active"]');
    await expect(page.locator("#todo-list li")).toHaveCount(1);
    await expect(page.locator("#todo-list li label.content")).toHaveText(["B"]);

    // Completedへ → Aだけ
    await page.click('footer a[href="#/completed"]');
    await expect(page.locator("#todo-list li")).toHaveCount(1);
    await expect(page.locator("#todo-list li label.content")).toHaveText(["A"]);

    // Completed画面で削除
    await page.locator("#todo-list li button.destroy").click();
    await expect(page.locator("#todo-list li")).toHaveCount(0);

    // Allへ → Bだけ残ってる
    await page.click('footer a[href="#/"]');
    await expect(page.locator("#todo-list li")).toHaveCount(1);
    await expect(page.locator("#todo-list li label.content")).toHaveText(["B"]);
  });
});
