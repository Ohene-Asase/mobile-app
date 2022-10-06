import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSearchPipe } from './custom-search.pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { ImageLoadPipe } from './image-load-pipe';
import { SafePipe } from './safe.pipe';
import { ValidateFormControlDirective } from './validate-form-control.directive';
import { ValidateFormDirective } from './validate-form.directive';

@NgModule({
  declarations: [
    CustomSearchPipe,
    DateAgoPipe,
    ImageLoadPipe,
    SafePipe,
    ValidateFormControlDirective,
    ValidateFormDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomSearchPipe,
    DateAgoPipe,
    ImageLoadPipe,
    SafePipe,
    ValidateFormControlDirective,
    ValidateFormDirective,
  ]
})
export class SharedModule { }
