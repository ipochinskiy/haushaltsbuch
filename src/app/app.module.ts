import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuEntryComponent } from './menu-entry/menu-entry.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';

import { RouterDecrypterService } from './router-decrypter.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuEntryComponent,
    MenuGroupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    RouterDecrypterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
