import * as vscode from 'vscode';
import { randomUUID } from 'crypto';
import { ApiStore } from '../services/apiStore';
import { Environment } from '../models/api';

export async function addApi(store: ApiStore): Promise<void> {
  const name = await vscode.window.showInputBox({
    prompt: 'API name',
    placeHolder: 'Users API',
    validateInput: (v) => (v.trim() ? undefined : 'Name is required'),
  });
  if (!name) {
    return;
  }

  const url = await vscode.window.showInputBox({
    prompt: 'API URL',
    placeHolder: 'http://localhost:8000/users',
    validateInput: (v) => {
      try {
        const u = new URL(v);
        return u.protocol === 'http:' || u.protocol === 'https:'
          ? undefined
          : 'URL must start with http:// or https://';
      } catch {
        return 'Enter a valid URL';
      }
    },
  });
  if (!url) {
    return;
  }

  const env = await vscode.window.showQuickPick<{ label: string; value: Environment }>(
    [
      { label: 'Local', value: 'local' },
      { label: 'Production', value: 'production' },
    ],
    { placeHolder: 'Which environment is this API in?' }
  );
  if (!env) {
    return;
  }

  await store.add({
    id: randomUUID(),
    name: name.trim(),
    url: url.trim(),
    method: 'GET',
    environment: env.value,
    expectedStatus: 200,
    timeout: 5000,
  });
}