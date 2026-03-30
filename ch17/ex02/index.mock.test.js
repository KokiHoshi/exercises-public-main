import { jest } from '@jest/globals';
import {
  parseRepo,
  listIssues,
  createIssue,
  closeIssue,
} from './github-issues-lib.js';

describe('github issues library with jest mock', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('parseRepo: owner/repo を分解できる', () => {
    expect(parseRepo('octocat/Hello-World')).toEqual({
      owner: 'octocat',
      repo: 'Hello-World',
    });
  });

  test('parseRepo: 不正な形式ならエラー', () => {
    expect(() => parseRepo('octocat')).toThrow(
      '--repo must be in format <owner>/<name>',
    );
  });

  test('listIssues: open issues を取得し、pull request を除外する', async () => {
    const mockData = [
      { id: 1, title: 'issue 1' },
      { id: 2, title: 'pr 1', pull_request: {} },
      { id: 3, title: 'issue 2' },
    ];

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () => JSON.stringify(mockData),
    });

    const result = await listIssues({
      repo: 'octocat/Hello-World',
      perPage: 50,
      token: 'dummy-token',
    });

    expect(result).toEqual([
      { id: 1, title: 'issue 1' },
      { id: 3, title: 'issue 2' },
    ]);

    expect(fetch).toHaveBeenCalledTimes(1);

    const [url, init] = fetch.mock.calls[0];
    expect(url.toString()).toContain('/repos/octocat/Hello-World/issues');
    expect(url.toString()).toContain('state=open');
    expect(url.toString()).toContain('per_page=50');
    expect(init.method).toBe('GET');
    expect(init.headers.Authorization).toBe('Bearer dummy-token');
  });

  test('createIssue: issue を作成できる', async () => {
    const mockData = {
      id: 101,
      number: 12,
      title: 'Bug report',
      html_url: 'https://github.com/octocat/Hello-World/issues/12',
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      statusText: 'Created',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () => JSON.stringify(mockData),
    });

    const result = await createIssue({
      repo: 'octocat/Hello-World',
      title: 'Bug report',
      body: 'Steps to reproduce',
      token: 'dummy-token',
    });

    expect(result.number).toBe(12);
    expect(result.title).toBe('Bug report');

    const [url, init] = fetch.mock.calls[0];
    expect(url.toString()).toContain('/repos/octocat/Hello-World/issues');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      title: 'Bug report',
      body: 'Steps to reproduce',
    });
  });

  test('closeIssue: issue を close できる', async () => {
    const mockData = {
      id: 101,
      number: 12,
      title: 'Bug report',
      state: 'closed',
      html_url: 'https://github.com/octocat/Hello-World/issues/12',
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () => JSON.stringify(mockData),
    });

    const result = await closeIssue({
      repo: 'octocat/Hello-World',
      number: 12,
      token: 'dummy-token',
    });

    expect(result.state).toBe('closed');

    const [url, init] = fetch.mock.calls[0];
    expect(url.toString()).toContain('/repos/octocat/Hello-World/issues/12');
    expect(init.method).toBe('PATCH');
    expect(JSON.parse(init.body)).toEqual({ state: 'closed' });
  });

  test('GitHub API エラー時は reject される', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      text: async () => JSON.stringify({ message: 'Not Found' }),
    });

    await expect(
      listIssues({
        repo: 'octocat/Hello-World',
        token: 'dummy-token',
      }),
    ).rejects.toThrow('GitHub API request failed (404): Not Found');
  });
});
