import * as vscode from 'vscode';
import { ApiTreeProvider } from './providers/apiTreeProvider';

export function activate(context: vscode.ExtensionContext) {
  const treeProvider = new ApiTreeProvider();

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('apiPulse.apis', treeProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('api-pulse.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from api-pulse!');
    })
  );
}

export function deactivate() {}