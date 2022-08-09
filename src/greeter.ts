/// <reference types="jquery" />

import helloWorld from "./hello";
import { pi, phi, absolute } from "./maths";
import { RegexValidator } from "./Validators/RegexValidator"
import * as $ from "jquery"

$(() => {
  alert("Page Loaded");
});

helloWorld();
console.log(pi);
const absPhi = absolute(phi);

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.getElementById("message").textContent = greeter(user);
var btn = document.getElementById("btnTest") as HTMLButtonElement;
btn.onclick = function () {
  var inputText = document.getElementById("inputText") as HTMLInputElement;
  var testText = document.getElementById("regexTest") as HTMLInputElement;
  var ex = eval("/^" + testText.value + "$/");
  console.log(ex);
  var regex = new RegexValidator(ex);
  var testResult = regex.isAcceptable(inputText.value);
  var elResult = document.getElementById("result");
  elResult.textContent = testResult.toString();
  //elResult.className = (testResult) ? "green" : "red";

  $("#result").removeClass().addClass((testResult) ? "green" : "red")
};
