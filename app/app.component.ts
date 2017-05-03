import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Keg } from './keg.model';

@Component({
  selector: 'app-root',
  template: `
  <nav>
    <div class="nav-wrapper yellow darken-3">
      <a href="#" class="brand-logo center">Gluhg</a>
      <ul id="nav-mobile" class="hide-on-med-and-down">
        <li *ngIf="!showNewKeg" class="right"><a (click)="toggleNewKeg()">Add a Keg</a></li>
        <li *ngIf="showNewKeg" class="right"><a (click)="toggleNewKeg()">Done</a></li>
        <li class="left"><a href="#">Beer</a></li>
      </ul>
    </div>
  </nav>
  <keg-new *ngIf="showNewKeg" (newKegSender)="addKeg($event)"></keg-new>
  <div class="row">
    <div class="col s12">
      <keg-list [kegs]="kegs" (pintSoldSender)="pintSold($event)"></keg-list>
    </div>
  </div>
  `
})

export class AppComponent {
  kegs: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.kegs = af.database.list('/kegs');
  }

  showNewKeg: boolean = false;

  toggleNewKeg() {
    this.showNewKeg = !(this.showNewKeg);
  }

  addKeg(newKeg: Keg) {
    this.kegs.push(newKeg);
  }

  pintSold(kegToUpdate: any) {
    this.kegs.update(kegToUpdate.key, { pintsConsumed: kegToUpdate.pintsConsumed });
  }
}
