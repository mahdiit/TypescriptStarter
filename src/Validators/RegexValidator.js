define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.RegexValidator = void 0;
    var RegexValidator = /** @class */ (function () {
        function RegexValidator(regEx) {
            this._regEx = regEx;
        }
        RegexValidator.prototype.isAcceptable = function (s) {
            return this._regEx.test(s);
        };
        return RegexValidator;
    }());
    exports.RegexValidator = RegexValidator;
});
