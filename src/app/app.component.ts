import { Component } from '@angular/core';
import { ElectronService } from './core/electron/electron.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService, private translateService: TranslateService) {
    this.translateService.setDefaultLang('de');
    if (electronService.isElectron) {
      console.log('Running on electron mode');
    } else {
      console.log('Running on web mode');
    }
  }
}
