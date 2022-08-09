import { StringValidator } from "./StringValidator";
export class RegexValidator implements StringValidator {
  _regEx: RegExp;
  constructor(regEx: RegExp) {
    this._regEx = regEx;
  }
  isAcceptable(s: string) {
    return this._regEx.test(s);
  }
}