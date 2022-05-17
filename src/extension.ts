import axios from 'axios';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "not-lorem" is now active!');

	let disposable = vscode.commands.registerCommand('not-lorem.searchWords', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Editor does not exist');
			return;
		}
		vscode.window.showInformationMessage('Enter The Number Of Words In The Input Box');
		const input = await vscode.window.showInputBox();
		const res = await axios.get(`http://asdfast.beobit.net/api/?type=word&length=${input}`);
		const data = await res.data.text;
		editor.selections.forEach(selection => editor.edit((e) => e.insert(selection.active, data)));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
