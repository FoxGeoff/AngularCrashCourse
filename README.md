# Plualsight's Angular Crash Course

Enter new weight on page, default to current date
Highlight if they put in a past date
XX Don’t allow future dates
Settings page
Overview on home page - trend or something? Last 3 entries?

Add some kind of goal setting?
A setting to turn on body fat or BMI tracking. It’s all hidden if not
Settings for pounds or kilos
Setting to create a workout??
Workout tracking
Calorie tracking
Body fat % tracking
BMI tracking
Need some kind of content projection - popup? Maybe a common Tip component
Http - https://github.com/typicode/json-server

Finish demo
Break down demo into outline
***
# Working Project: Angular Crash Couse

## Basic Templates
* data interpolation: {{data}}
* DOM element property binding: <td [hidden]= show> <!-- show:boolean = true -->
* built in directives *ngIf ="show", * ngFor="let item of items"
* <button> {{showBodyFat? "Hide" : "Show"}}  Body Fat </button>

## Child Components
* Add home.component
* Move html, code and service from app.component to home.component
* Add new-weight-entry component
* Insert html for this component to display into home.component.html
* Code: html for NewWeightEntry Component
* Add to button (click)="CreateEntry()"

## @Input() data binding 
* Add: On button toggle (home component) hide/show input box (new weight entry component)
* In home component we share the value with the child component: <hm-new-weight-entry [showBodyFat]="showBodyFat "> to @Input()showBodyFat
* In the child component the value is use:
```
<label *ngIf="showBodyFat" for="bodyfat" class="sr-only">Body Fat %</label>
<input *ngIf="showBodyFat" type="text" name="bodyfat" id="bodyfat" autocomplete="off" class="form-control my-1 mr-sm-2" placeholder="Body Fat %">
```

## @Ouput() data binding (raising an event from child "new weight entry component")
* @Output() create = new EventEmitter(); (new-weght-entry component)
* Add method :
```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
...
createEntry(){ 
   this.create.emit({id:-1, date: new Date ('11/21/2018'), weight:110, bodyFat:0.35});
}
```
* Now Bind to the Event: <hm-new-weight-entry [showBodyFat] = "showBodyFat" (create)="createNewEntry($event)">
* Create Method:
```
creatNewEvent(entry: Entry){
   this.entriesSvc.AddEntry(entry);
}

```