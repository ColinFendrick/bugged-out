// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BugModule } from './bugs/bug.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule, BugModule, AppRoutingModule],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
