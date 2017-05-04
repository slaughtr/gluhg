import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { masterFirebaseConfig } from './api-keys';

import { AppComponent } from './app.component';
import { KegNewComponent } from './keg-new.component';
import { KegEditComponent } from './keg-edit.component';
import { KegListComponent } from './keg-list.component';
import { TotalLeftPipe } from './total-left.pipe'
import { StyleFilterPipe } from './style-filter.pipe'

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
}


@NgModule({
  imports: [ BrowserModule,
             FormsModule,
             NoopAnimationsModule,
             MaterialModule.forRoot(),
             AngularFireModule.initializeApp(firebaseConfig)
           ],
  declarations: [ AppComponent,
                  KegNewComponent,
                  KegListComponent,
                  KegEditComponent,
                  TotalLeftPipe,
                  StyleFilterPipe
                ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
