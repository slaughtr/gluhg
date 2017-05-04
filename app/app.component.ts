import { Component, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Keg } from './keg.model';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  template: `
  <ul id='dropdown1' class='dropdown-content z-depth-5'>
    <li (click)="selectedStyle = 'all';" value="all"><a>All</a></li>
    <li (click)="selectedStyle = 'light';" value="light"><a>Light</a></li>
    <li (click)="selectedStyle = 'hoppy';" value="hoppy"><a>Hoppy</a></li>
    <li (click)="selectedStyle = 'dark';" value="dark"><a>Dark</a></li>
    <li (click)="selectedStyle = 'cider';" value="cider"><a>Cider</a></li>
    <li (click)="selectedStyle = 'other';" value="other"><a>Other</a></li>
  </ul>
  <nav>
    <div class="nav-wrapper yellow darken-3">
      <a href="#" class="brand-logo center">Gluhg</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li *ngIf="!showNewKeg" class="right"><a (click)="toggleNewKeg()">Add a Keg</a></li>
        <li *ngIf="showNewKeg" class="right"><a (click)="toggleNewKeg()">Done</a></li>
        <li>
          <a class='dropdown-button btn' href='#' data-activates='dropdown1'>Filter by: {{selectedStyle}}</a>

        </li>
      </ul>
    </div>
  </nav>

  <keg-new *ngIf="showNewKeg" (newKegSender)="addKeg($event)"></keg-new>
  <div class="row">
    <div class="col s12">
      <keg-list [kegs]="kegs | stylefilter:selectedStyle | async" (pintSoldSender)="pintSold($event)" (removeKegSender)="removeKeg($event)" (editKegSender)="editKeg($event)"></keg-list>
    </div>
  </div>
  `
})

export class AppComponent {
  kegs: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.kegs = af.database.list('/kegs');
  }

  selectedStyle: string = 'all';
  showNewKeg: boolean = false;

  toggleNewKeg() {
    this.showNewKeg = !(this.showNewKeg);
  }

  addKeg(newKeg: Keg) {
    this.kegs.push(newKeg);
  }

  removeKeg(key: string) {
    this.kegs.remove(key);
  }

  editKeg(kegToEdit: any) {
    delete kegToEdit.keg.$exists;
    delete kegToEdit.keg.$key;
    this.kegs.update(kegToEdit.key, kegToEdit.keg)
  }

  pintSold(kegToUpdate: any) {
    this.kegs.update(kegToUpdate.key, { pintsConsumed: kegToUpdate.pintsConsumed });
  }

  ngAfterViewInit() {
    jQuery('.dropdown-button').dropdown({
      constrainWidth: true,
      gutter: 15,
      belowOrigin: true,
      alignment: 'left'
    })
  }
}
