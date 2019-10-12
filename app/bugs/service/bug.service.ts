import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Bug } from '../model/bug';

@Injectable()
export class BugService {
  private bugsDbRef = this.fire.database.ref('/bugs');

  constructor(private fire: FirebaseConfigService) { }

  getAddedBugs(): Observable<any> {
    return Observable.create(obs => {
      this.bugsDbRef.on(
        'child_added',
        bug => {
          const newBug = bug.val() as Bug;
          obs.next(newBug);
        },
        err => obs.error(err)
      );
    });
  }

  addBug(
    { title, status, severity, description }: Bug
  ): void {
    const newBugRef = this.bugsDbRef.push();
    newBugRef.set({
      title,
      status,
      severity,
      description,
      createdBy: 'Colin',
      createdDate: Date.now()
    }).catch(err => console.error(err));
  }
}
