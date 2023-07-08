import { Component } from '@angular/core';

@Component({
  selector: 'app-testdemo',
  templateUrl: './testdemo.component.html',
  styleUrls: ['./testdemo.component.css']
})
export class TestdemoComponent {

  sum(a:number,b:number){
    return a+b;
  }

}
