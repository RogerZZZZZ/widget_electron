'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu')
const template = require('./scripts/menu')

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let settingsWindow;
let shouldQuit = false;
var menu = Menu.buildFromTemplate(template);

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow.close();
	settingsWindow.close();
	mainWindow = null;
	settingsWindow = null;
	app.quit();
}

function createMainWindow() {
	const is2nd = process.argv.indexOf('--2nd') >= 0;
	var opts = {
		width: 1200,
		height: 600,
		'accept-first-mouse': true,
		'title-bar-style': 'hidden'
	};
  if (is2nd) {
    setOptsForDualScreen(opts);
  }

	const win = new BrowserWindow(opts);
	if (process.env.DEV) {
		win.loadUrl('http://localhost:8000/dev.html');
		win.openDevTools();
	} else {
		win.loadUrl(`file://${__dirname}/index.html`);
	}
	win.on('closed', onClosed);

	if (menu) {
		Menu.setApplicationMenu(menu);
		menu = null;
	}

	global.mainWindow = win;

	settingsWindow = createSettingWindow();

	return win;
}

global.terminate = function () {
    shouldQuit = true;
    app.quit();
};

// Someone tried to run a second instance, we should focus our window
var shouldStartInstance = app.makeSingleInstance(function(commandLine, workingDirectory) {
    if (mainWindow) {
        if (!mainWindow.isVisible()) {
            mainWindow.show();
        }
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    }
    return true;
});

if (shouldStartInstance) {
    app.quit();
    return;
}

function createSettingWindow() {
	settingsWindow = new BrowserWindow({
        width: 600,
        height: 480,
        frame: false,
        resizable: false
    });
    settingsWindow.loadURL('file://' + __dirname + '/settings.html');
    settingsWindow.hide();
    settingsWindow.webContents.openDevTools();
    settingsWindow.on('close', function(e) {
        if (!shouldQuit) {
            e.preventDefault();
			console.log("obj");
			settingsWindow.hide();
        }
		// settingsWindow.hide();
    });
    settingsWindow.on('closed', function() {
        settingsWindow = null;
    });

    global.settingsWindow = settingsWindow;

	return settingsWindow;
}

function setOptsForDualScreen(opts) {
  var atomScreen = require('screen');
  var displays = atomScreen.getAllDisplays();
  var d2 = displays.length > 1 ? displays[1] : null;
  if (d2) {
    opts.x = d2.bounds.x + (d2.size.width - opts.width) / 2;
    opts.y = d2.bounds.y + (d2.size.height - opts.height) / 2;
  }
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();

	if (process.env.DEV) {
		const watcher = require('./scripts/watcher.js');
		watcher.watch(app, ['./index.js', './scripts']);
	}
});
