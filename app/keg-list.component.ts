import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
    <md-grid-list cols="2" rowHeight="100px">
      <md-grid-tile *ngFor="let keg of kegs | async">
        <div class="card-panel orange">
          <span class="card-title">{{keg.name}}<small> from <strong>{{keg.brewery}}</strong></small></span>
          <p>{{keg.abv}}% - IBUs: {{keg.ibu}}</p>
        </div>
      </md-grid-tile>
    </md-grid-list>

  `
})

export class KegListComponent {
  @Input() kegs: Keg[];

}
