import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from "@angular/flex-layout";
import { PokemonStore } from './pokemon.store.ts/pokemon.store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    PagesModule
  ],
  providers: [PokemonStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
