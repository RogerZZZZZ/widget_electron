const path = require('path');
const electron = global.require('electron');
export const remote = electron.remote;
const Menu = remote.Menu;
const Tray = remote.Tray;

export const app = remote.app;
export const shell = remote.shell;
export const dialog = remote.dialog;
export const ipcRenderer = electron.ipcRenderer;
export const BrowserWindow = remote.BrowserWindow;

import event from './event';
import { APP_NAME, EVENT } from './constants';

const terminate = remote.getGlobal('terminate');
const settingsWindow = remote.getGlobal('settingsWindow');

const window = () => {
    return remote.getCurrentWindow();
}


const focusWindow = (browserWindow) => {
    if (!browserWindow.isVisible()) {
        browserWindow.show();
    }
    if (browserWindow.isMinimized()) {
        browserWindow.restore();
    }
    browserWindow.focus();
}

const focusCurrentWindow = () => {
    focusWindow(window());
}

const setDockIconVisibility = () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.some(win => win.isVisible())) {
        app.dock.show();
    } else {
        app.dock.hide();
    }
}

let appIcon;

event.on(EVENT.CLOSE_WINDOW, () => {
    window().hide();
    window().close();
});

event.on(EVENT.HIDE_WINDOW, () => {
    window().hide();
    setDockIconVisibility();
});
event.on(EVENT.MINIMIZE_WINDOW, () => {
    window().minimize();
});
event.on(EVENT.MAXIMIZE_WINDOW, () => {
    window().isMaximized() ? window().unmaximize() : window().maximize();
});

event.on(EVENT.OPEN_SETTINGS_WINDOW, () => {
    if (settingsWindow) {
        focusWindow(settingsWindow);
    }
});

event.on(EVENT.OPEN_EXTERNAL_URL, (url) => {
    shell.openExternal(url);
});

window().on('maximize', event.emit.bind(null, EVENT.WINDOW_MAXIMIZED));
window().on('unmaximize', event.emit.bind(null, EVENT.WINDOW_UNMAXIMIZED));

export default {};
