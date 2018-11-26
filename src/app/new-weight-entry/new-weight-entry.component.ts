import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hm-new-weight-entry',
  templateUrl: './new-weight-entry.component.html',
  styleUrls: ['./new-weight-entry.component.css']
})
export class NewWeightEntryComponent implements OnInit {
  @Input() showBodyFat: boolean;
  @Output() create =  new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  CreateEntry() {
    this.create.emit({id:-1, date: new Date ('11/21/2018'), weight:110, bodyFat:0.35});
  }
}
