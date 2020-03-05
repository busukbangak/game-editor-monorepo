import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { I18nModule } from './i18n/i18n.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    I18nModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    I18nModule
  ]
})
export class CoreModule { }
