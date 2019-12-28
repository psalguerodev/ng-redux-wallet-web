import { Pipe, PipeTransform } from '@angular/core';
import { InputOutput, InputOutputType } from '../model/input-output.model';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(items: InputOutput[], type: InputOutputType, onlyFilter: boolean = false): number {
    let total = 0;
    const filter = items.filter(i => i.type === type);
    total = onlyFilter ? filter.length : filter.map(i => i.amount).reduce((a, b) => a + b, 0);
    return total;
  }

}
