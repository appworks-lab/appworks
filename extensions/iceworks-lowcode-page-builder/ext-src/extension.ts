import * as vscode from 'vscode';
import { handleService, getHtmlForWebview } from '@iceworks/vscode-webview/lib/vscode';
import services from './services/index';

const { window, ViewColumn } = vscode;

interface IMessage {
  service: string;
  method: string;
  eventId: string;
  [propName: string]: any;
}

export function activate(context: vscode.ExtensionContext) {
  const { extensionPath, subscriptions } = context;

	console.log('Congratulations, your extension "iceworks-lowcode-page-builder" is now active!');

  function activeWebview() {
    const webviewPanel: vscode.WebviewPanel = window.createWebviewPanel('iceworks', 'Create Page', ViewColumn.One, {
      enableScripts: true,
      retainContextWhenHidden: true,
    });
    webviewPanel.webview.html = getHtmlForWebview(extensionPath);
    handleService(webviewPanel.webview, subscriptions, services);
  }
  context.subscriptions.push(vscode.commands.registerCommand('iceworks-lowcode-page-builder.create', function() {
    activeWebview();
  }));
}

export function deactivate() {}
