import { Pipe, PipeTransform } from '@angular/core';
import { InputOutput } from '../model/input-output.model';

@Pipe({
  name: 'orderItems',
})
export class OrderItemsPipe implements PipeTransform {

  transform(items: InputOutput[], ...args: any[]): InputOutput[] {
    return items.sort( (a, b) =>  (a.type === 'input' ) ? -1 : 1);
  }

}
