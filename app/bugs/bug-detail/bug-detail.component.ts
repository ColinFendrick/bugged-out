import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';
import { FORBIDDEN_STRINGS } from '../constant/constants';
import { STATUS, SEVERITY } from '../../shared/constant/constants';

@Component({
  moduleId: module.id,
  selector: 'bug-detail',
  templateUrl: 'bug-detail.component.html',
  styleUrls: ['bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {
  private modalId = "bugModal";
  private bugForm: FormGroup;
  private statuses = STATUS;
  private statusArr: string[] = [];
  private severities = SEVERITY;
  private severityArr: string[] = [];
  private currentBug = new Bug();

  constructor(private formB: FormBuilder, private bugService: BugService) { }

  ngOnInit(): void {
    // We only want the keys that are numbers, not the strings --
    // this is a consequence of how js cmpiles enums
    this.statusArr = Object.keys(this.statuses).filter(Number);
    this.severityArr = Object.keys(this.severities).filter(Number);
    this.configureForm();
  }

  configureForm(bug?: Bug): void {
    // If a bug is sent in from the html, use that bug
    if (bug) {
      // Use a new instance so we are not coupled to our local data
      this.currentBug = new Bug(
        bug.id,
        bug.title,
        bug.status,
        bug.severity,
        bug.description,
        bug.createdBy,
        bug.createdDate,
        bug.updatedBy,
        bug.updatedDate
      );
    }

    const { title, status, severity, description } = this.currentBug;
    this.bugForm = this.formB.group({
      title: [title, [Validators.required, forbiddenStringValidator(FORBIDDEN_STRINGS)]],
      status: [status, Validators.required],
      severity: [severity, Validators.required],
      description: [description, Validators.required]
    });
  }

  submitForm(): void {
    this.currentBug.title = this.bugForm.value['title'];
    this.currentBug.status = this.bugForm.value['status'];
    this.currentBug.severity = this.bugForm.value['severity'];
    this.currentBug.description = this.bugForm.value['description'];
    if (this.currentBug.id) {
      this.updateBug();
    } else {
      this.addBug();
    }
  }

  addBug(): void {
    this.bugService.addBug(this.currentBug);
  }

  updateBug(): void {
    this.bugService.updateBug(this.currentBug);
  }

  removeBug(): void {
    this.bugService.removeBug(this.currentBug);
  }

  freshForm() {
    this.bugForm.reset({ status: this.statuses.Logged, severity: this.severities.Severe });
    this.cleanBug();
  }

  cleanBug() {
    this.currentBug = new Bug();
  }
}
