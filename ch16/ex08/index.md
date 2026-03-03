## 実行方法

- githubでアクセストークンを作成
- PowerShellでアクセストークンを設定
  $env:GITHUB_TOKEN="github_pat_XXXXX"

- Issueの作成
  node index.mjs create --repo kokiHoshi/test-gh-cli --title "CLI test issue" --body "created by gh-issues"
  t issue" --body "created by gh-issues" created: #1 (id=4006366271) CLI test issue
  https://github.com/KokiHoshi/test-gh-cli/issues/1

- 一覧表示
  node index.mjs list --repo kokiHoshi/test-gh-cli
  blic-main\ch16\ex08> node index.mjs list --repo kokiHoshi/test-gh-cli 4006366271 CLI test issue

- クローズ
  node index.mjs close --repo kokiHoshi/test-gh-cli --number 1
  blic-main\ch16\ex08> node index.mjs close --repo kokiHoshi/test-gh-cli --number 1 closed: #1 (id=4006366271) CLI test issue
  https://github.com/KokiHoshi/test-gh-cli/issues/1

- help
  node index.mjs --help
  blic-main\ch16\ex08> node index.mjs --help Usage:
  gh-issues [global options] <command> [command options]

  Commands:
  list List open issues (id and title)
  create Create an issue
  close Close an issue

  Global options:
  -h, --help Show help
  -v, --verbose Print HTTP logs

  list options:
  --repo <owner/name> (required)
  --per-page <n> (default: 30)

  create options:
  --repo <owner/name> (required)
  --title <string> (required)
  --body <string> (optional)

  close options:
  --repo <owner/name> (required)
  --number <issue_number> (required) e.g. 123

  Examples:
  export GITHUB_TOKEN="ghp_xxx" # or fine-grained token
  gh-issues list --repo octocat/Hello-World
  gh-issues create --repo octocat/Hello-World --title "Bug" --body "Steps..."
  gh-issues close --repo octocat/Hello-World --number 12

- verbose(一覧表示)
  node index.mjs list --repo kokiHoshi/test-gh-cli -v
  blic-main\ch16\ex08> node index.mjs list --repo kokiHoshi/test-gh-cli -v ---- HTTP REQUEST ----
  GET https://api.github.com/repos/kokiHoshi/test-gh-cli/issues?state=open&per_page=30
  headers: {
  Accept: 'application/vnd.github+json',
  Authorization: 'Bearer github_pat_XXXXX', 'X-GitHub-Api-Version': '2022-11-28'
  }
  ---- HTTP RESPONSE ----
  status: 200 OK
  headers: {
  'access-control-allow-origin': '\*',
  'access-control-expose-headers': 'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-R
  ateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset', 'cache-control': 'private, max-age=60, s-maxage=60',
  'content-length': '2',
  'content-security-policy': "default-src 'none'",
  'content-type': 'application/json; charset=utf-8',
  date: 'Sun, 01 Mar 2026 05:52:35 GMT',
  etag: '"9deb7a2ab0fab7fcd74209097cab511932fcbb7893241414f9888c5be31d27e7"',
  'github-authentication-token-expiration': '2026-03-31 14:37:32 +0900',
  'referrer-policy': 'origin-when-cross-origin, strict-origin-when-cross-origin',  
   server: 'github.com',
  'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
  vary: 'Accept, Authorization, Cookie, X-GitHub-OTP,Accept-Encoding, Accept, X-Requeste
  d-With', 'x-accepted-github-permissions': 'issues=read',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'deny',
  'x-github-api-version-selected': '2022-11-28',
  'x-github-media-type': 'github.v3; format=json',
  'x-github-request-id': '14B8:344A41:ABAB97:DF3A96:69A3D423',
  'x-ratelimit-limit': '5000',
  'x-ratelimit-remaining': '4994',
  'x-ratelimit-reset': '1772347137',
  'x-ratelimit-resource': 'core',
  'x-ratelimit-used': '6',
  'x-xss-protection': '0'
  }
  body: []
  (no open issues)
