import { spawn } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function runWithStdin(command, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args)

    let stdout = ""
    let stderr = ""

    child.stdout.on("data", data => (stdout += data))
    child.stderr.on("data", data => (stderr += data))

    child.on("close", code => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(new Error(stderr))
      }
    })

    child.stdin.write(input)
    child.stdin.end()
  })
}

describe("charfreq", () => {
  it("変更前と結果が同じであること", async () => {
    const input = fs.readFileSync(path.resolve(__dirname, "charfreq.js"), "utf-8")

    const stdout = await runWithStdin("node", [path.resolve(__dirname, "index.js")], input)
    const expected = await runWithStdin("node", [path.resolve(__dirname, "charfreq.js")], input)

    expect(stdout).toBe(expected)
  })
})

