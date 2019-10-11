import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
require('firebase/database');

import { FIREBASE_CONFIG } from '../constant/constants';

@Injectable()
export class FirebaseConfigService {
  public database: firebase.database.Database;

  constructor() {
    this.configureApp();
    this.configureDatabase();
  }

  configureApp():void {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  configureDatabase():void {
    this.database = firebase.database();
  }
}
