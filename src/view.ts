import * as vscode from 'vscode';
import * as path from 'path';

export default class View implements vscode.Disposable {
    private readonly disposables: vscode.Disposable[] = [];
    constructor(private panel: vscode.WebviewPanel, private context: vscode.ExtensionContext) {
        this.disposables.push(this.panel.onDidChangeViewState(_e => {
            if (panel.visible) {
                this.initialize();
            }
        }));
    }

    private initialize() {
        const { panel, context } = this;
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'frontend', 'index.html'));
        const iframeSrc = panel.webview.asWebviewUri(onDiskPath);
        const iframeUri = iframeSrc.with({ scheme: 'vscode-resource' });
        const allowedFrameSrc = panel.webview.cspSource;

        const outputHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy"
                          content="
                            default-src 'none';
                            media-src ${allowedFrameSrc} data:;
                            frame-src ${allowedFrameSrc};
                            script-src ${allowedFrameSrc} vscode-webview:;
                            style-src 'unsafe-inline' ${allowedFrameSrc};
                          ">
            <title>Visual Studio Code Network Console</title>
            <style>
      html, body, iframe {
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: 0;
      }
            </style>
        </head>
        <body>
            <h1>Iframe is below:</h1>
            <iframe src="${iframeUri}" id="host" frameBorder="0"></iframe>
        </body>
        </html>`;
        panel.webview.html = outputHtml;
    }

    static create(context: vscode.ExtensionContext) {
        const panel = vscode.window.createWebviewPanel('repro', 'Repro', vscode.ViewColumn.Active, {
            enableScripts: true,
            enableCommandUris: true,
            retainContextWhenHidden: true,
        });
        const result = new View(panel, context);
        return result;
    }

    dispose() {
        while (this.disposables.length) {
            const next = this.disposables.pop();
            if (next) {
                next.dispose();
            }
        }
    }
}
