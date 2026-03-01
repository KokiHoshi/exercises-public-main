import request from "supertest";
import { createApp } from "./index.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

describe("Express Server", () => {
  let dir;
  let app;

  beforeAll(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), "test-"));
    await fs.writeFile(path.join(dir, "index.html"), "<h1>Hello</h1>");
    app = createApp(dir);
  });

  test("HTMLを返す", async () => {
    const res = await request(app).get("/index.html");
    expect(res.status).toBe(200);
    expect(res.text).toBe("<h1>Hello</h1>");
  });

  test("mirrorが動く", async () => {
    const res = await request(app)
      .post("/test/mirror")
      .set("X-Test", "1")
      .send("abc");

    expect(res.status).toBe(200);
    expect(res.text).toContain("POST /test/mirror");
    expect(res.text).toContain("X-Test: 1");
    expect(res.text).toContain("abc");
  });
});
