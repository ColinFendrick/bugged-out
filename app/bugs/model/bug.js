"use strict";
var constants_1 = require('../../shared/constant/constants');
var Bug = (function () {
    function Bug(id, title, status, severity, description, createdBy, createdDate, updatedBy, updatedDate) {
        if (id === void 0) { id = null; }
        if (title === void 0) { title = null; }
        if (status === void 0) { status = constants_1.STATUS.Logged; }
        if (severity === void 0) { severity = constants_1.SEVERITY.Severe; }
        if (description === void 0) { description = null; }
        if (createdBy === void 0) { createdBy = null; }
        if (createdDate === void 0) { createdDate = null; }
        this.id = id;
        this.title = title;
        this.status = status;
        this.severity = severity;
        this.description = description;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }
    return Bug;
}());
exports.Bug = Bug;
//# sourceMappingURL=bug.js.map