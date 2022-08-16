/// <reference types="jquery" />

import helloWorld from "./hello";
import { pi, phi, absolute } from "./maths";
import { RegexValidator } from "./Validators/RegexValidator"
import * as $ from "jquery"
import { ExampleClass } from "./Decorators/MethodDecorator"
import * as myDb from "./indexdb"

$(async function () {
  alert("Page Loaded");

  let innerResult: string = "";
  var clientDb = new myDb.AppDb();  
  var allContact = await clientDb.Contact.GetAll();

  var contact = new myDb.IDbContact();
  var f = contact.GetFields();
  console.log(f.GetFields);
  console.log(f.last);
  //grid.render($("#gridHolder").get(0));
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

  $("#result").removeClass().addClass((testResult) ? "green" : "red");

  var cm = new ExampleClass();
  console.log(cm.method(0, "hello", true));
  cm.method(1, "hello-2", false);
  cm.method(2, "hello-3", false);
};
