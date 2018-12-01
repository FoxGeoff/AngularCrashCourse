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
# Module: Forms
## Add a form
* Import into app.module "formsModule" from "@angular/forms";
* Initialise the form:
```
model;

resetForm(){
   this.model = {};
}
```
* Update the form:
```
<form #entryForm ="ngForm" class="form-inline">
...
   <input type="text" name="weight" id="weight" class="form-control my-1 mr-sm-2" autocomplete="off" placeholder="Weight" [(ngModel)]="model.weight">
...
   <button (click)="CreateEntry()" class="btn btn-primary my-1">Save</button>
</form>
```
* Update funtion to pass real data:
```
 createEntry() {
    let newEntry = Object.assign({}, this.model, {
      bodyFat: this.model.bodyFat / 100,
      date: new Date(this.model.date)
    });

    this.create.emit(newEntry);
  }
  ```
* Clear out form after sending the data(click has two actions):
```<button (click)="createEntry(); resetForm();"> Save </button>```
* Button can't save until all checks are valid:
```<button [disabled]="entryForm.form.invalid"> ```
* Add checks to each control required,  type="email" etc.

## HTTP

# Observables - Reactive Extensions for JavaScript - RXJS

* ```get``` is used to manipulate the values passing through the stream:
```
http.get(url).pipe(
       map(entries => { 
          return entries.sort((a,b) => {
               // sort alogrithm
      })
})
```
* ```tap``` is used to do something as a value comes through the stream:
```
tap (entries => {
   console.log (entitries.length);
})
```
* ```subscribe``` to use an observable [0 = no calls made, n = n calls made]:
* for each http, each subscribe() will re-issue the http call:
```
obs.subscrib(val => {
   //do something with val
})
```
* map() to format the data
* tap() to just look at values
* subscribe() to be the end client

# Using the http node server (new terminal server)

*Run: ``` npm run server ``` json sever on port 3000

## Send requests to that port using proxy.conf.json
```
{
   "api": {
      "target": "http://localhost:3000",
      "secure": false
   }
}
```

## Update: app.module.ts
* Add: import {HttpClientModule} from '@angular/common/http' ;

## Update: service calls
* remove the data object and reference methods and variable
* inject the HttpClient (common/http)
* Add: method getEntries(){}
```
public getEntries() {
    return this.http.get<Entry[]>('http://localhost:3000/api/entries').pipe(
      map(entries => {
        return entries.map(e => {
          e.date = new Date(e.date);
          return e;
        })
      }),
      map(entries => {
        return entries.sort((a: Entry, b: Entry) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date.getTime() == b.date.getTime()) {
            return 0;
          } else {
            return -1
          }
        });
      })
    )
  }
```
## Update: home.component calls
*  Add variable and method
```
export class HomeComponent implements OnInit {
  showBodyFat = true;
  entries: Entry[];
  ...
 ngOnInit() {
    this.entriesSvc.getEntries().subscribe( entries => {
      this.entries = entries;
    })
  }
```
# Modify POST request to HTTP server

# Code: addEntry(entry: Entry) {}
* in service code:
```
addEntry(entry: Entry) {
    return this.http.post('http://localhost:3000/api/entries', entry);
  }
```
* in the home.component:
```
createNewEntry(entry: Entry){
    this.entriesSvc.addEntry(entry).subscribe(() =>{
      this.entriesSvc.getEntries().subscribe(entries => {
        this.entries = entries;
      });
    })
  }
```
# Routing

## Import int app module 'RouterModule':
```
RouterModule.forRoot([
   {path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent }
])
```
## Add login component:
* Run: ``` ng  g c login --spec false ```
* Run: ``` ng g s identity -- spec false ```
* Code HTML Template 
* Code component
``` constructor(private indentityScv: IdentityService) { } ```
* Add login method
```
login(){
   this.identitySvc.loggedIn = true;
}

```
* Add logout method
```
logout(){
    this.indentityScv.loggedIn = false;
}
```
* Update routes:
```
imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
        ]),
```
* Add to menu the links:
```
<ul class="navbar-nav mr-auto">
      <li class="navbar-brand">
        <i class="fas fa-weight"></i>
      </li>
      <li class="nav-item">
        <a [routerLink]="['/home']" class="nav-link">Home</a>
      </li>
      <li *ngIf="!identitySvc.loggedIn" class="nav-item">
        <a [routerLink]="['/login']" class="nav-link">Login</a>
      </li>
      <li *ngIf="identitySvc.loggedIn" class="nav-item">
        <a [routerLink]="['/login']" class="nav-link">Logout</a>
      </li>
    </ul>
```
* Remember to now use ```<router-outlet></router-outlet>```

## Add: entry-details.component

* Run:``` ng g c entry-details --spec false ```
* Add route ``` { path: 'entries/:id', component: EntryDetailsComponent } ```
* Code entry-details for id = 1 and check:
```
export class EntryDetailsComponent implements OnInit {
  entry: Entry;
  constructor(private entriesSvc: WeightEntriesService) { }

  ngOnInit() {
    let id = 1;
    this.entriesSvc.getEntries().subscribe(entries => {
      this.entry = entries.find(e => {
        return e.id === id;
      });
    });
  }
```
* test run
* add the html template
* detail icon for display of details. Add new column to home table.
```
<tbody>
    <tr *ngFor="let entry of entries">
      <td style="width:20px;">
        <a [routerLink]="['/entries/' + entry.id]">
          <span class="detailIcon"><i class="fas fa-info-circle"></i></span>
        </a>
      </td>
```
* test run
* update code to give real id details
```
export class EntryDetailsComponent implements OnInit {
  entry: Entry;
  constructor(private entriesSvc: WeightEntriesService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.currentRoute.snapshot.params.id;
    this.entriesSvc.getEntries().subscribe(entries => {
      this.entry = entries.find(e => {
        return e.id === id;
      });
    });
  }

```
# Add delete item

# Add edit item

## Going to production