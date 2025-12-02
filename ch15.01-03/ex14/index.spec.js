import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
  return page.goto("http://localhost:3000/ch15.01-03/ex14/index.html");
}

function getSelect(page) {
  return page.getByTestId("select");
}

function getFood1(page) {
  return page.getByTestId("food1");
}

function getStationery1(page) {
  return page.getByTestId("stationery1");
}

function getStationery2(page) {
  return page.getByTestId("stationery2");
}

test.describe("Product filter by category", () => {
  test("initially all products are visible", async ({ page }) => {
    await gotoTestTarget(page);

    await expect(getFood1(page)).toBeVisible();
    await expect(getStationery1(page)).toBeVisible();
    await expect(getStationery2(page)).toBeVisible();
  });

  test("when select food, only food products are visible", async ({ page }) => {
    await gotoTestTarget(page);

    await getSelect(page).selectOption("food");

    await expect(getFood1(page)).toBeVisible();
    await expect(getStationery1(page)).toBeHidden();
    await expect(getStationery2(page)).toBeHidden();
  });

  test("when select stationery, only stationery products are visible", async ({
    page,
  }) => {
    await gotoTestTarget(page);

    await getSelect(page).selectOption("stationery");

    await expect(getFood1(page)).toBeHidden();
    await expect(getStationery1(page)).toBeVisible();
    await expect(getStationery2(page)).toBeVisible();
  });

  test("when back to all, all products are visible again", async ({ page }) => {
    await gotoTestTarget(page);

    await getSelect(page).selectOption("food");
    await getSelect(page).selectOption("all");

    await expect(getFood1(page)).toBeVisible();
    await expect(getStationery1(page)).toBeVisible();
    await expect(getStationery2(page)).toBeVisible();
  });
});
