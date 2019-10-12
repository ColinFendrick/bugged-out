import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private formB: FormBuilder) {}

  ngOnInit():void {
    this.configureForm();
  }

  configureForm():void {
    this.bugForm = this.formB.group({
      title: [null, [Validators.required, forbiddenStringValidator(FORBIDDEN_STRINGS)]],
      status: [1, Validators.required],
      severity: [1, Validators.required],
      description: [null, Validators.required]
    });
  }

  submitForm():void {
    console.log(this.bugForm) //TODO: REMOVE
  }
}
