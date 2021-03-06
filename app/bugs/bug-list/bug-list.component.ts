import { Component, OnInit } from '@angular/core';

import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';

@Component({
  moduleId: module.id,
  selector: 'bug-list',
  templateUrl: 'bug-list.component.html',
  styleUrls: ['bug-list.component.css']
})
export class BugListComponent implements OnInit {
  private bugs: Bug[] = [];

  constructor(private bugService: BugService) { }

  ngOnInit(): void {
    this.getAddedBugs();
    this.getUpdatedBugs();
    this.getRemovedBugs();
  }

  getAddedBugs(): void {
    this.bugService.getAddedBugs()
      .subscribe(
        bug => this.bugs.push(bug),
        err => console.error('Unable to get added bug: ', err)
      );
  }

  getUpdatedBugs(): void {
    this.bugService.changedListener()
      .subscribe(
        bug => {
          const bugIndex = this.bugs.findIndex(({ id }) => id === bug.id);
          this.bugs[bugIndex] = bug;
        },
        err => console.error('Unable to get updated bug - ', err)
      );
  }

  getRemovedBugs(): void {
    this.bugService.removedListener()
      .subscribe(
        bug => {
          const bugIndex = this.bugs.findIndex(({ id }) => id === bug.id);
          this.bugs.splice(bugIndex, 1);
        },
        err => console.error('Unable to remove bug - ', err)
      );
  }
}
