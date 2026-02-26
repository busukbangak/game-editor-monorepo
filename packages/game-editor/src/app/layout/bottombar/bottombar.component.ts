import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

interface LogEntry {
  type: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent implements OnInit, AfterViewChecked {
  @ViewChild('consoleOutput') consoleOutput: ElementRef;
  
  logs: LogEntry[] = [];
  private shouldScrollToBottom = false;
  private originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
  };

  constructor() { }

  ngOnInit(): void {
    this.interceptConsole();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private interceptConsole(): void {
    const self = this;
    
    console.log = function(...args: any[]) {
      self.addLog('log', args);
      self.originalConsole.log.apply(console, args);
    };

    console.error = function(...args: any[]) {
      self.addLog('error', args);
      self.originalConsole.error.apply(console, args);
    };

    console.warn = function(...args: any[]) {
      self.addLog('warn', args);
      self.originalConsole.warn.apply(console, args);
    };

    console.info = function(...args: any[]) {
      self.addLog('info', args);
      self.originalConsole.info.apply(console, args);
    };
  }

  private addLog(type: string, args: any[]): void {
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');

    const time = new Date().toLocaleTimeString();
    this.logs.push({ type, message, time });
    this.shouldScrollToBottom = true;

    // Limit to last 100 logs
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  clearConsole(): void {
    this.logs = [];
  }

  private scrollToBottom(): void {
    if (this.consoleOutput) {
      const element = this.consoleOutput.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
