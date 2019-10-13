"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var bug_service_1 = require('../service/bug.service');
var bug_1 = require('../model/bug');
var forbidden_string_validator_1 = require('../../shared/validation/forbidden-string.validator');
var constants_1 = require('../constant/constants');
var constants_2 = require('../../shared/constant/constants');
var BugDetailComponent = (function () {
    function BugDetailComponent(formB, bugService) {
        this.formB = formB;
        this.bugService = bugService;
        this.modalId = "bugModal";
        this.statuses = constants_2.STATUS;
        this.statusArr = [];
        this.severities = constants_2.SEVERITY;
        this.severityArr = [];
        this.currentBug = new bug_1.Bug();
    }
    BugDetailComponent.prototype.ngOnInit = function () {
        // We only want the keys that are numbers, not the strings --
        // this is a consequence of how js cmpiles enums
        this.statusArr = Object.keys(this.statuses).filter(Number);
        this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    };
    BugDetailComponent.prototype.configureForm = function (bug) {
        // If a bug is sent in from the html, use that bug
        if (bug) {
            // Use a new instance so we are not coupled to our local data
            this.currentBug = new bug_1.Bug(bug.id, bug.title, bug.status, bug.severity, bug.description, bug.createdBy, bug.createdDate, bug.updatedBy, bug.updatedDate);
        }
        var _a = this.currentBug, title = _a.title, status = _a.status, severity = _a.severity, description = _a.description;
        this.bugForm = this.formB.group({
            title: [title, [forms_1.Validators.required, forbidden_string_validator_1.forbiddenStringValidator(constants_1.FORBIDDEN_STRINGS)]],
            status: [status, forms_1.Validators.required],
            severity: [severity, forms_1.Validators.required],
            description: [description, forms_1.Validators.required]
        });
    };
    BugDetailComponent.prototype.submitForm = function () {
        this.currentBug.title = this.bugForm.value['title'];
        this.currentBug.status = this.bugForm.value['status'];
        this.currentBug.severity = this.bugForm.value['severity'];
        this.currentBug.description = this.bugForm.value['description'];
        if (this.currentBug.id) {
            this.updateBug();
        }
        else {
            this.addBug();
        }
        this.freshForm();
    };
    BugDetailComponent.prototype.addBug = function () {
        this.bugService.addBug(this.currentBug);
    };
    BugDetailComponent.prototype.updateBug = function () {
        this.bugService.updateBug(this.currentBug);
    };
    BugDetailComponent.prototype.removeBug = function () {
        this.bugService.removeBug(this.currentBug);
        this.freshForm();
    };
    BugDetailComponent.prototype.freshForm = function () {
        this.bugForm.reset({ status: this.statuses.Logged, severity: this.severities.Severe });
        this.cleanBug();
    };
    BugDetailComponent.prototype.cleanBug = function () {
        this.currentBug = new bug_1.Bug();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BugDetailComponent.prototype, "currentBug", void 0);
    BugDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bug-detail',
            templateUrl: 'bug-detail.component.html',
            styleUrls: ['bug-detail.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, bug_service_1.BugService])
    ], BugDetailComponent);
    return BugDetailComponent;
}());
exports.BugDetailComponent = BugDetailComponent;
//# sourceMappingURL=bug-detail.component.js.map