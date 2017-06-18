import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';

import { MenuComponent } from './menu/menu.component';
import { MenuEntryComponent } from './menu-entry/menu-entry.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    MainComponent,

    MenuComponent,
    MenuEntryComponent,
    MenuGroupComponent,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
