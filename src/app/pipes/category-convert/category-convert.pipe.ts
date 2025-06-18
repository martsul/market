import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryConvert',
  standalone: true
})
export class CategoryConvertPipe implements PipeTransform {
  transform(value: string): string {
    return value.split("-").join(" ");
  }
}
