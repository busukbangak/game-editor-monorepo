import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { ShowroomComponent } from './showroom/showroom.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BottombarComponent } from './bottombar/bottombar.component';

@NgModule({
  declarations: [
    ShowroomComponent,
    SidebarComponent,
    BottombarComponent
  ],
  imports: [
    CoreModule,
    SharedModule
  ],
  exports: [
    ShowroomComponent,
    SidebarComponent,
    BottombarComponent
  ]
})
export class LayoutModule { }
