import * as vscode from 'vscode';
import { ApiStore } from '../services/apiStore';
import { ApiDefinition } from '../models/api';

export class ApiTreeItem extends vscode.TreeItem {
  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly children: ApiTreeItem[] = []
  ) {
    super(label, collapsibleState);
  }
}

export class ApiTreeProvider implements vscode.TreeDataProvider<ApiTreeItem> {
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private readonly store: ApiStore) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ApiTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ApiTreeItem): ApiTreeItem[] {
    if (element) {
      return element.children;
    }

    const apis = this.store.getAll();
    return [
      this.group('Local', apis.filter((a) => a.environment === 'local')),
      this.group('Production', apis.filter((a) => a.environment === 'production')),
      this.group('Incidents', []),
    ];
  }

  private group(label: string, apis: ApiDefinition[]): ApiTreeItem {
    const children =
      apis.length > 0
        ? apis.map((api) => this.apiItem(api))
        : [new ApiTreeItem('No APIs yet', vscode.TreeItemCollapsibleState.None)];
    return new ApiTreeItem(label, vscode.TreeItemCollapsibleState.Expanded, children);
  }

  private apiItem(api: ApiDefinition): ApiTreeItem {
    const item = new ApiTreeItem(api.name, vscode.TreeItemCollapsibleState.None);
    item.description = api.url;
    item.tooltip = `${api.method} ${api.url}`;
    item.iconPath = new vscode.ThemeIcon('circle-outline');
    return item;
  }
}