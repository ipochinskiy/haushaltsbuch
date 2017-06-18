import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';

import { reducer } from './app.reducer';

import {
  LocationModule,

  UpdateLocationEffects,
} from './location';

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

    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),

    RouterModule.forRoot([
      {
        path: '**',
        component: MainComponent,
      },
    ]),

    EffectsModule.run(UpdateLocationEffects),

    LocationModule,
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
