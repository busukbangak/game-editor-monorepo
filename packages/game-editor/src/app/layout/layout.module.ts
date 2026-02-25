import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { ShowroomComponent } from './showroom/showroom.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { MacTitlebarComponent } from './titlebar/mac-titlebar/mac-titlebar.component';
import { WindowsTitlebarComponent } from './titlebar/windows-titlebar/windows-titlebar.component';

@NgModule({
  declarations: [
    TitlebarComponent,
    MacTitlebarComponent,
    WindowsTitlebarComponent,
    ShowroomComponent,
    SidebarComponent,
    BottombarComponent
  ],
  imports: [
    CoreModule,
    SharedModule
  ],
  exports: [
    TitlebarComponent,
    MacTitlebarComponent,
    WindowsTitlebarComponent,
    ShowroomComponent,
    SidebarComponent,
    BottombarComponent
  ]
})
export class LayoutModule { }
