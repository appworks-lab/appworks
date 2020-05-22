import * as path from "path";
import * as fs from 'fs';
import * as vscode from 'vscode';

export function makeTerminalPrettyName(cwd: string, taskName: string): string {
  return `${path.basename(cwd)} - ${taskName}`;
}

export function pathExists(p: string): boolean {
  try {
    fs.accessSync(p);
  } catch (err) {
    return false;
  }
  return true;
}

export function openFile(resource: any) {
  if (pathExists(resource.fsPath)) {
    vscode.window.showTextDocument(resource);
  } else {
    vscode.window.showErrorMessage('Entry file not found.');
  }
}