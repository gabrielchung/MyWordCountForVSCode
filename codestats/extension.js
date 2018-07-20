// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const window = vscode.window;

// Get word count from the document
function get_word_count() {
    var editor = window.activeTextEditor;
    if (!editor) {
        return -1;
    }
    var document_content = editor.document.getText();
    return get_word_count_from_content(document_content);
}

function get_word_count_from_content(text_content) {

    var docContent = text_content;

    // Parse out unwanted whitespace so the split is accurate
    docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
    docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    let wordCount = 0;
    if (docContent !== "") {
        wordCount = docContent.split(" ").length;
    }

    return wordCount;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "codestats" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');

        // Display word count
        var word_count = -1;
        try {
            word_count = get_word_count();
        }
        catch(err) {
            vscode.window.showInformationMessage('Exception: ' + err.message);
        }

        if (word_count !== -1) {
            vscode.window.showInformationMessage('Word Count: ' + word_count);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;