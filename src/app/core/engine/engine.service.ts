
import { Injectable, ElementRef } from '@angular/core';
import { Application } from './Application';

@Injectable({ providedIn: 'root' })
export class EngineService {

  application: Application;

  public constructor() { }

  public createApplication(canvas: HTMLCanvasElement): void {
    this.application = new Application(canvas);

  }
}