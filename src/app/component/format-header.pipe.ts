import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHeader'
})
export class FormatHeaderPipe implements PipeTransform {

  transform(value: string): any {
    if (!value) { return null; }
    return `${value.charAt(0).toUpperCase().bold()}${value.charAt(1)}`;
  }

}
