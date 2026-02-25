import { Component, OnInit } from '@angular/core';
import { remote } from 'electron' 

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  platform: NodeJS.Platform;

  constructor() { }

  ngOnInit(): void {
    this.platform = remote.process.platform;
  }

}
