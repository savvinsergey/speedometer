import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedometerComponent } from './components/speedometer/speedometer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SpeedometerComponent],
  exports: [SpeedometerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
