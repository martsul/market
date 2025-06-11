import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertResultStatistic',
})
export class ConvertResultStatisticPipe implements PipeTransform {
  transform(value: number): string {
    const reversedValue: string[] = `${value}`.split('').reverse();
    const convertedReversedResult: string[] = [];
    let countIteration = 0;
    reversedValue.forEach((v): void => {
      if (countIteration > 2) {
        countIteration = 0;
        convertedReversedResult.push(',');
      }
      convertedReversedResult.push(v);
      countIteration++;
    });
    return `${convertedReversedResult.reverse().join('')}+`;
  }
}
