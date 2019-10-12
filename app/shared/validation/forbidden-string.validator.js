"use strict";
function forbiddenStringValidator(strList) {
    return function (control) {
        var str = control.value;
        var invalid = strList.some(function (rx) { return rx.test(str); });
        return invalid ? { 'forbiddenString': { str: str } } : null;
    };
}
exports.forbiddenStringValidator = forbiddenStringValidator;
//# sourceMappingURL=forbidden-string.validator.js.map