import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

declare var jQuery: any;

@Component({
  selector: 'keg-edit',
  template: `
  <div class="row">
    <div class="col s12 m10 offset-m1">
      <div class="card grey darken-2">
        <div class="card-content white-text">
          <span class="card-title">Edit a Keg</span>
          <div class="row">
            <div class="input-field col s6">
              <input [(ngModel)]="keg.name" id="name" name="name" type="text">
              <label for="name" class="active">Name</label>
            </div>
            <div class="input-field col s6">
              <input [(ngModel)]="keg.brewery" id="brewery" name="brewery" type="text">
              <label for="brewery" class="active">Brewery</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <select id="style" [(ngModel)]="keg.style" name="style">
                <option *ngFor="let style of styles" [value]="style">{{style}}</option>
              </select>
              <label class="active">Style</label>
            </div>
            <div class="input-field col s4">
              <select id="size" [(ngModel)]="keg.pintsCapacity" name="size">
                <option value="124">½ Barrel</option>
                <option value="105">50 Liter</option>
                <option value="64">¼ Barrel</option>
                <option value="41">⅙ Barrel</option>
              </select>
              <label class="active">Keg Size</label>
            </div>
            <div class="input-field col s4">
              <label class="active">Price $ {{keg.price}}</label>
              <br>
              <p class="range-field">
                <input [(ngModel)]="keg.price" type="range" name="price" min="1.0" max="10.0" step="0.25">
              </p>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <label class="active">ABV {{keg.abv}} %</label>
              <br>
              <p class="range-field">
                <input [(ngModel)]="keg.abv" type="range" name="abv" min="1.0" max="20.0" step="0.1">
              </p>
            </div>
            <div class="input-field col s6">
              <label class="active">IBU {{keg.ibu}}</label>
              <br>
              <p class="range-field">
                <input [(ngModel)]="keg.ibu" type="range" name="ibu" min="0" max="150" step="1">
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <button (click)="editKeg(keg.$key, keg)" class="waves-effect waves-light btn col s12" type="button">Edit Keg</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

export class KegEditComponent {
  @Input() keg: Keg;
  @Output() editKegSender = new EventEmitter();

  styles: string[] = ['Ale','Amber','American Adjunct Lager','Barley wine','Belgian Ale','Black IPA','Bock','Brown Ale','Cascadian Dark Ale','Cider','Dunkelweizen','ESB','Gosé','Helles Bock','Imperial IPA','Imperial Stout','India Pale Ale','Irish Stout','Kölsch','Lager','Pale Ale','Pilsner','Porter','Red Ale','Schwarzbier','Session Ale','Sour Ale','Stout','Wheat Beer'];


  editKeg(key: string, keg: Keg) {
    this.editKegSender.emit({key: key, keg: keg});
  }

  ngAfterViewInit() {
    jQuery('#style').val(this.keg.style)
    jQuery('#size').val(this.keg.pintsCapacity)
    jQuery('select').material_select(this.change.bind(this));
  }

  change() {
    this.keg.style = jQuery('#style').val()
    var diff = this.keg.pintsCapacity - this.keg.pintsConsumed;
    this.keg.pintsCapacity = parseInt(jQuery('#size').val())
    this.keg.pintsConsumed = this.keg.pintsCapacity - diff;
  }

  onSubmit() {
    event.preventDefault();
  }
}
