import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: 'totalleft',
  pure: false
})


export class TotalLeftPipe implements PipeTransform {

  transform(input: Keg, option: string) {
    var percentage: number = ((input.pintsConsumed/input.pintsCapacity))
    var color = percentage * 120;
    if (option === 'style') {
      return {'width': `${percentage*100}%`,
      'background-color': `hsl(${color}, 90%, 45%)`}
    } else if (option === 'alert') {
      if (percentage < 0.1) {
        return 'low';
      } else if (percentage > 0.9) {
        return 'high';
      }
    }
  }
}
