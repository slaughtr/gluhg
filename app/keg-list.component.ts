import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <md-grid-list cols="2" rowHeight="165px">
    <md-grid-tile *ngFor="let keg of kegs | async">
      <div class="card orange">
        <div class="row">
          <div class="col s9">
            <div class="col s12">
              <h5 class="card-title"><strong>{{keg.name | titlecase}}</strong><small><br>from <strong>{{keg.brewery | titlecase}}</strong></small></h5>
            </div>
            <div class="col s6">
              <div class="chip">
                <span class="left-align">{{keg.style}}</span>
              </div>
            </div>
            <div class="col s6">
              <span class="new badge grey darken-3" data-badge-caption="% ABV">{{keg.abv}}</span>
              <span class="new badge grey darken-3" data-badge-caption="IBUs">{{keg.ibu}}</span>
            </div>
          </div>
          <div class="col s3">
            <h3 class="right activator">{{keg.price | currency:'USD':true:'1.2-2'}}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="progress">
              <div class="determinate" [ngStyle]="keg | totalleft"></div>
            </div>
          </div>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">{{keg.name}}<i class="material-icons right">close</i></span>
          <button class="waves-effect waves-light btn left">Edit</button>
          <button (click)="pintSold(keg.$key, keg)" class="waves-effect waves-light btn right">Pint Sold</button>
        </div>
      </div>
    </md-grid-tile>
  </md-grid-list>

  `
})

export class KegListComponent {
  @Input() kegs: Keg[];
  @Output() pintSoldSender = new EventEmitter();

  pintSold(key: string, keg: Keg) {
    keg.pintsConsumed--;
    this.pintSoldSender.emit({key: key, pintsConsumed: keg.pintsConsumed});
  }

}
