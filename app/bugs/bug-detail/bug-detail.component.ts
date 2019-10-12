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

  configureForm(): void {
    this.bugForm = this.formB.group({
      title: [null, [Validators.required, forbiddenStringValidator(FORBIDDEN_STRINGS)]],
      status: [1, Validators.required],
      severity: [1, Validators.required],
      description: [null, Validators.required]
    });
  }

  submitForm(): void {
    this.addBug();
    this.bugForm.reset({ status: 1, severity: 1 });
  }

  addBug(): void {
    this.currentBug.title = this.bugForm.value['title'];
    this.currentBug.status = this.bugForm.value['status'];
    this.currentBug.severity = this.bugForm.value['severity'];
    this.currentBug.description = this.bugForm.value['severity'];
    this.bugService.addBug(this.currentBug);
  }
}
