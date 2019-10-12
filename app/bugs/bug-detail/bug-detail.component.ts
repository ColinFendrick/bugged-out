import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  ngOnInit():void {
    this.configureForm();
  }

  configureForm():void {
    this.bugForm = new FormGroup({
      title: new FormControl(null, [Validators.required, forbiddenStringValidator(FORBIDDEN_STRINGS)]),
      status: new FormControl(1, Validators.required),
      severity: new FormControl(1, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  submitForm():void {
    console.log(this.bugForm) //TODO: REMOVE
  }
}
