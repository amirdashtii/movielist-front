import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';



@NgModule({
  declarations: [
    HideHeaderDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
