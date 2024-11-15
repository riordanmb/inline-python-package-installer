import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('Python Module Installer');
  context.subscriptions.push(outputChannel);

  const installModuleCommand = vscode.commands.registerCommand('extension.installModule', async (moduleName: string) => {
    const config = vscode.workspace.getConfiguration('inlinePythonPackageInstaller');
    const autoInstall = config.get<boolean>('autoInstallModules', false);
    const customPipCommand = config.get<string>('customPipCommand', 'pip install');

    const terminal = vscode.window.createTerminal(`Install: ${moduleName}`);
    const installCommand = `${customPipCommand} ${moduleName}`;

    if (autoInstall) {
      terminal.sendText(installCommand);
      terminal.show();
      outputChannel.appendLine(`Auto-installing module: ${moduleName}`);
    } else {
      const selection = await vscode.window.showInformationMessage(
        `Module '${moduleName}' is missing. Would you like to install it?`,
        'Yes',
        'No'
      );
      if (selection === 'Yes') {
        terminal.sendText(installCommand);
        terminal.show();
        outputChannel.appendLine(`Installing module: ${moduleName}`);
      } else {
        outputChannel.appendLine(`Installation of module '${moduleName}' was declined.`);
      }
    }
  });

  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    { language: 'python', scheme: 'file' },
    new MissingImportProvider(outputChannel),
    { providedCodeActionKinds: MissingImportProvider.providedCodeActionKinds }
  );

  context.subscriptions.push(installModuleCommand, codeActionProvider);
}

class MissingImportProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];
  private outputChannel: vscode.OutputChannel;

  constructor(outputChannel: vscode.OutputChannel) {
    this.outputChannel = outputChannel;
  }

  provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {
    const line = document.lineAt(range.start.line);
    const importMatch = line.text.match(/^import (\w+)|^from (\w+) import/);
    if (!importMatch) {
      return;
    }
    const moduleName = importMatch[1] || importMatch[2];
    const installAction = new vscode.CodeAction(
      `Install missing module '${moduleName}'`,
      vscode.CodeActionKind.QuickFix
    );
    installAction.command = {
      command: 'extension.installModule',
      title: 'Install Module',
      arguments: [moduleName]
    };
    return [installAction];
  }
}

export function deactivate() {}