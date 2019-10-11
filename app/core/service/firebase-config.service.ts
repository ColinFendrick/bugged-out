import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { FIREBASE_CONFIG } from '../constant/constants';

@Injectable()
export class FirebaseConfigService {
  constructor() {
    this.configureApp();
  }

  configureApp() {
    const app = firebase.initializeApp(FIREBASE_CONFIG);
    console.log(app); // TODO: REMOVE
  }
}
