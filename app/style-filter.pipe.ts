import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: 'stylefilter',
  pure: true
})


export class StyleFilterPipe implements PipeTransform {
  light: string[] = ['American Adjunct Lager', 'Kölsch','Lager', 'Pilsner'];
  hoppy: string[] = ['Ale', 'Black IPA', 'Cascadian Dark Ale','Imperial IPA', 'India Pale Ale','ESB','Pale Ale','Session Ale',]
  dark: string[] = ['Brown Ale', 'Imperial Stout', 'Irish Stout', 'Porter', 'Stout'];

  transform(input: any, style: string) {
    if (style === 'all') {
      return input;
    } else if (style === 'light') {
      return input.map(data => data.filter(keg => {
        return this.light.indexOf(keg.style) !== -1;
      }));
    } else if (style === 'hoppy') {
      return input.map(data => data.filter(keg => {
        return this.hoppy.indexOf(keg.style) !== -1;
      }));
    } else if (style === 'dark') {
      return input.map(data => data.filter(keg => {
        return this.dark.indexOf(keg.style) !== -1;
      }));
    } else if (style === 'cider') {
      return input.map(data => data.filter(keg => {
        return keg.style === 'Cider';
      }));
    } else {
      return input.map(data => data.filter(keg => {
        return ((this.dark.indexOf(keg.style) === -1) && (this.hoppy.indexOf(keg.style) === -1) && (this.light.indexOf(keg.style) === -1) && (keg.style !== 'Cider'));
      }));
    }

  }
}
