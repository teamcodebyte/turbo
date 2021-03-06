import { BrowserWindow } from "electron";

class Window {
  window: BrowserWindow;

  constructor(window: BrowserWindow) {
    this.window = window;
  }

  setWindow(window: BrowserWindow) {
    this.window = window;
  }
  showWindow() {
    this.window.show();
  }
  hideWindow() {
    this.window.hide();
  }
  restoreWindow() {
    this.window.unmaximize();
    this.window.setSize(800, 600);
  }
  maximizeWindow() {
    this.window.maximize();
  }
  minimizeWindow() {
    this.window.minimize();
  }
  closeWindow() {
    this.window.close();
  }

  setURL(url: string) {
    this.window.loadURL(url);
  }
  getSize() {
    const size = this.window.getSize();
    return {
      width: size[0],
      height: size[1],
    };
  }
  toggleDevTools() {
    this.window.webContents.toggleDevTools();
  }
}

export default Window;
