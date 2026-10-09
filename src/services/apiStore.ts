import * as vscode from 'vscode';
import { ApiDefinition } from '../models/api';

const STORAGE_KEY = 'apiPulse.apis';

export class ApiStore {
  private readonly _onDidChange = new vscode.EventEmitter<void>();
  readonly onDidChange = this._onDidChange.event;

  constructor(private readonly state: vscode.Memento) {}

  getAll(): ApiDefinition[] {
    return this.state.get<ApiDefinition[]>(STORAGE_KEY, []);
  }

  async add(api: ApiDefinition): Promise<void> {
    await this.state.update(STORAGE_KEY, [...this.getAll(), api]);
    this._onDidChange.fire();
  }
}