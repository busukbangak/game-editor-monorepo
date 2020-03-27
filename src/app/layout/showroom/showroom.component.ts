import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { EngineService } from '../../core/engine/engine.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})

export class ShowroomComponent implements OnInit, AfterViewInit {


  @ViewChild('canvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;

  constructor(private engineService: EngineService) { }

  ngOnInit(): void {
   
  }

  async ngAfterViewInit() {
    await this.engineService.createApplication(this.canvas.nativeElement);
  }





}
