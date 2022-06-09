import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { calculator } from '../assets/calc.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Calculator';
  View = "";

  ngAfterViewInit(): void {
    this.View = "";
  }
  dis(_: string) {
    this.View += _;
  }
  pop() {
    let buffer = Array.from(this.View);
    buffer.pop();
    this.View = buffer.join("");
  }
  solve() {
    this.View = calculator.calculate(this.View);
  }
  clr() {
    this.View = '';
  }
}
