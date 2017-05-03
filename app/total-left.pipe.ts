import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: 'totalleft',
  pure: false
})


export class TotalLeftPipe implements PipeTransform {

  transform(input: Keg) {
    var percentage: number = ((input.pintsConsumed/input.pintsCapacity))
    var color = percentage * 120;
    return {'width': `${percentage*100}%`,
            'background-color': `hsl(${color}, 100%, 50%)`}
  }
}
