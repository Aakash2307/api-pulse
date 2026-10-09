import * as vscode from 'vscode';
import { ApiTreeProvider } from './providers/apiTreeProvider';
import { ApiStore } from './services/apiStore';
import { addApi } from './commands/addApi';

export function activate(context: vscode.ExtensionContext) {
  const store = new ApiStore(context.globalState);
  const treeProvider = new ApiTreeProvider(store);

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('apiPulse.apis', treeProvider),
    store.onDidChange(() => treeProvider.refresh()),
    vscode.commands.registerCommand('apiPulse.addApi', () => addApi(store))
  );
}

export function deactivate() {}