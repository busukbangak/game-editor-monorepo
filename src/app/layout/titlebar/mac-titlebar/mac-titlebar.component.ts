import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ipcRenderer, remote } from 'electron';

@Component({
  selector: 'app-mac-titlebar',
  templateUrl: './mac-titlebar.component.html',
  styleUrls: ['./mac-titlebar.component.scss']
})
export class MacTitlebarComponent implements OnInit {

  isFullScreen: boolean;

  isFocused: boolean;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isFullScreen = remote.getCurrentWindow().isFullScreen();
    this.isFocused = remote.getCurrentWindow().isFocused();

    ipcRenderer.on('win-focus' , (event , data) => { 
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
    if (currentWindow.isFullScreen()) {
      currentWindow.setFullScreen(false)
    } else {
      currentWindow.setFullScreen(true)
    }
    this.isFullScreen = currentWindow.isFullScreen();
    this.ref.detectChanges();

  }

  closeWindow() {
    remote.getCurrentWindow().close();
  }

}
