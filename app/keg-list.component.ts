import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <md-grid-list gutterSize="10px" cols="2" rowHeight="246px">
    <md-grid-tile *ngFor="let keg of kegs">
      <md-grid-tile-header class="grey lighten-1 black-text">
        <div class="row">
          <h5><strong>{{keg.name}}</strong></h5>
        </div>
      </md-grid-tile-header>


      <div class="card horizontal grey lighten-1 z-depth-0">
        <div class="card-image">
          <img [src]="keg.imgURL">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div class="row">
              <div class="col s9">
                <div class="col s12">

                    <h5><small>from <strong>{{keg.brewery | titlecase}}</strong></small>

                    <span *ngIf="(keg | totalleft:'alert') === 'low'" class="white-text chip red right">Almost Out</span>
                    <span *ngIf="(keg | totalleft:'alert') === 'high'" class="white-text chip green right">Just Tapped</span></h5>

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
          </div>
        </div>
        <div class="card-reveal grey lighten-1">
          <span class="card-title grey-text text-darken-4">{{keg.name}} <i (click)="toggleKegEdit(keg)" class="material-icons editIcon">edit</i><i class="material-icons right">close</i></span>
          <button (click)="pintSold(keg.$key, keg, 1)" class="waves-effect waves-light btn right">Pint Sold</button>
          <button (click)="pintSold(keg.$key, keg, 2)" class="waves-effect waves-light btn center">32oz Growler Sold</button>
          <button (click)="pintSold(keg.$key, keg, 4)" class="waves-effect waves-light btn center">64oz Growler Sold</button>
        </div>
      </div>
      <md-grid-tile-footer class="grey lighten-1">
        <div class="progress">
          <div class="determinate" [ngStyle]="keg | totalleft:'style'"></div>
        </div>
      </md-grid-tile-footer>
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
