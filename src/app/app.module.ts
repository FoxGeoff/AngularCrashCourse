import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewWeightEntryComponent } from './new-weight-entry/new-weight-entry.component';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NewWeightEntryComponent,
        LoginComponent,
    ],
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }