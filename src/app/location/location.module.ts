import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationDecrypterService } from './location-decrypter.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    LocationDecrypterService,
  ],
})
export class LocationModule {
}
