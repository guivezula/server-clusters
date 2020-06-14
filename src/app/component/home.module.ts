import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormatHeaderPipe } from './format-header.pipe';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [HomeComponent, FormatHeaderPipe, TimeAgoPipe],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
