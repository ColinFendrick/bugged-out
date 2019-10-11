// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BugModule } from './bugs/bug.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        AppRoutingModule,
        BugModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
