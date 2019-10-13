import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';
import { FORBIDDEN_STRINGS } from '../constants/constants';

@Component({
  moduleId: module.id,
  selector: 'bug-detail',
  templateUrl: 'bug-detail.component.html',
  styleUrls: ['bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {
  private modalId = "bugModal";
  private bugForm: FormGroup;
  @Input() currentBug = new Bug();

  constructor(private formB: FormBuilder, private bugService: BugService) { }

  ngOnInit(): void {
    this.configureForm();
  }

  configureForm(bug?: Bug): void {
    // If a bug is sent in from the html, use that bug
    if (bug) {
      this.currentBug = bug;
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
    this.addBug();
    this.freshForm();
  }

  addBug(): void {
    this.currentBug.title = this.bugForm.value['title'];
    this.currentBug.status = this.bugForm.value['status'];
    this.currentBug.severity = this.bugForm.value['severity'];
    this.currentBug.description = this.bugForm.value['severity'];
    this.bugService.addBug(this.currentBug);
  }

  freshForm() {
    this.bugForm.reset({ status: 1, severity: 1 });
    this.cleanBug();
  }

  cleanBug() {
    this.currentBug = new Bug();
  }
}
