import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';
import { listIssues } from './github-issues-lib.js';

Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe('github issues library with PollyJS', () => {
  let polly;

  beforeEach(() => {
    polly = new Polly('github-issues-list', {
      adapters: ['fetch'],
      persister: 'fs',
      recordIfMissing: true,
      persisterOptions: {
        fs: {
          recordingsDir: './ex02/__recordings__',
        },
      },
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  test('listIssues: 初回は記録、次回以降は録画を再生する', async () => {
    const result = await listIssues({
      repo: 'octocat/Hello-World',
      perPage: 5,
      token: process.env.GITHUB_TOKEN,
    });

    expect(Array.isArray(result)).toBe(true);
  });
});
