import * as vscode from 'vscode';


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

    const empty = () => [
      new ApiTreeItem('No APIs yet', vscode.TreeItemCollapsibleState.None),
    ];

    return [
      new ApiTreeItem('Local', vscode.TreeItemCollapsibleState.Expanded, empty()),
      new ApiTreeItem('Production', vscode.TreeItemCollapsibleState.Expanded, empty()),
      new ApiTreeItem('Incidents', vscode.TreeItemCollapsibleState.Expanded, empty()),
    ];
  }
}