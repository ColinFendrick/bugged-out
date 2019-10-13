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
      this.bugsDbRef.on('child_added', bug => {
        const newBug = bug.val() as Bug;
        newBug.id = bug.key;
        obs.next(newBug);
      },
        err => obs.error(err)
      );
    });
  }

  changedListener(): Observable<any> {
    return Observable.create(obs => {
      this.bugsDbRef.on('child_changed', bug => {
        const updatedBug = bug.val() as Bug;
        updatedBug.id = bug.key;
        obs.next(updatedBug);
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

  updateBug(bug: Bug): void {
    const currentBugRef = this.bugsDbRef.child(bug.id);
    // Don't push the id back to firebase
    bug.id = null;
    bug.updatedBy = 'Tom';
    bug.updatedDate = Date.now();
    currentBugRef.update(bug).catch(err => console.error(err));
  }
}
