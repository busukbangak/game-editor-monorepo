import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { remote, ipcRenderer } from 'electron'

@Component({
  selector: 'app-windows-titlebar',
  templateUrl: './windows-titlebar.component.html',
  styleUrls: ['./windows-titlebar.component.scss']
})
export class WindowsTitlebarComponent implements OnInit {


  isMaximized: boolean;

  isFocused: boolean;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isMaximized = remote.getCurrentWindow().isFullScreen();
    this.isFocused = remote.getCurrentWindow().isFocused();

    ipcRenderer.on('win-focus', (event, data) => {
      this.isFocused = data
      this.ref.detectChanges();
    });

  }

  showAppMenu($event) {
    ipcRenderer.send('show-app-menu', {
      x: $event.x,
      y: $event.y
    })
  }

  minimizeWindow() {
    remote.getCurrentWindow().minimize();
  }

  minMaxWindow() {
    const currentWindow = remote.getCurrentWindow()
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
    this.isMaximized = currentWindow.isMaximized();
    this.ref.detectChanges();

  }

  closeWindow() {
    remote.app.quit();
  }
}
