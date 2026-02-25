import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { LayoutModule } from './layout/layout.module';
import { ModulesModule } from './modules/modules.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    DataModule,
    LayoutModule,
    ModulesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
