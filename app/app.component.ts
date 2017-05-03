import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Keg } from './keg.model';

@Component({
  selector: 'app-root',
  template: `
  <keg-new (newKegSender)="addKeg($event)"></keg-new>
  <keg-list [kegs]="kegs"></keg-list>
  `
})

export class AppComponent {
  kegs: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.kegs = af.database.list('/kegs');
  }

  addKeg(newKeg: Keg) {
    this.kegs.push(newKeg);
  }
}
