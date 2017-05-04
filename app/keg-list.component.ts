import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <md-grid-list cols="2" rowHeight="165px">
    <md-grid-tile *ngFor="let keg of kegs | async">
      <div class="card grey lighten-1">
        <div class="row">
          <div class="col s9">
            <div class="col s12">
              <h5 class="card-title"><strong>{{keg.name | titlecase}}</strong><small><br>from <strong>{{keg.brewery | titlecase}}</strong></small></h5>
            </div>
            <div class="col s6">
              <div class="chip orange darken-3">
                <span class="left-align white-text">{{keg.style}}</span>
              </div>
            </div>
            <div class="col s6">
              <span class="new badge grey darken-3" data-badge-caption="% ABV">{{keg.abv}}</span>
              <span *ngIf="keg.ibu > 0" class="new badge grey darken-3" data-badge-caption="IBUs">{{keg.ibu}}</span>
            </div>
          </div>
          <div class="col s3">
            <h3 class="right">{{keg.price | currency:'USD':true:'1.2-2'}}</h3>
            <button class="waves-effect waves-light btn-flat right activator"><span id="more-text" class="activator">More</span> <i class="material-icons">input</i></button>
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
          <span class="card-title grey-text text-darken-4">{{keg.name}} <i (click)="toggleKegEdit(keg)" class="material-icons editIcon">edit</i><i class="material-icons right">close</i></span>
          <button (click)="pintSold(keg.$key, keg, 1)" class="waves-effect waves-light btn right">Pint Sold</button>
          <button (click)="pintSold(keg.$key, keg, 2)" class="waves-effect waves-light btn center">32oz Growler Sold</button>
          <button (click)="pintSold(keg.$key, keg, 4)" class="waves-effect waves-light btn center">64oz Growler Sold</button>
        </div>
      </div>
    </md-grid-tile>
  </md-grid-list>
  <keg-edit *ngIf="selectedKegToEdit" [keg]="selectedKegToEdit" (editKegSender)="editKeg($event)"></keg-edit>

  `
})

export class KegListComponent {
  @Input() kegs: Keg[];
  @Output() pintSoldSender = new EventEmitter();
  @Output() removeKegSender = new EventEmitter();
  @Output() editKegSender = new EventEmitter();
  showKegEdit: boolean = false;
  selectedKegToEdit: Keg;

  pintSold(key: string, keg: Keg, volume: number) {
    keg.pintsConsumed -= volume;
    if (keg.pintsConsumed < 1) {
      this.removeKegSender.emit(key);
    } else {
      this.pintSoldSender.emit({key: key, pintsConsumed: keg.pintsConsumed});
    }
  }

  toggleKegEdit(keg: Keg) {
    this.selectedKegToEdit = keg;
  }

  editKeg(kegToEdit: any) {
    this.selectedKegToEdit = null;
    this.editKegSender.emit(kegToEdit);
  }

}
