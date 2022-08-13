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
  var ids = await clientDb.GetContactList(0, 10);
  innerResult = '<table border="1">';
  await ids.forEach(element => {
    innerResult += `<tr><td>${element.first}</td><td>${element.last}</td>
    <td class="btnClick">${element.id}</td>
    <td><button class="btnDelete">Delete</button></td>
    <td><button class="btnViewEmail" data-id="${element.id}">Email</button></td>
    <td><button class="btnViewPhone" data-id="${element.id}">Phone</button></td>
    </tr>`;

  });
  innerResult += "</table>";
  $("#gridHolder").html(innerResult);

  $(".btnClick").on("click", function (event) {
    alert($(this).html());
  });
  $(".btnViewEmail").on("click", async function (event) {
    var id = Number.parseInt($(this).attr("data-id"));
    var emails = await clientDb.GetEmails(id);
    await emails.forEach(element => { alert(element.email) });
  });
  $(".btnViewPhone").on("click", async function (event) {
    var id = Number.parseInt($(this).attr("data-id"));
    var phones = await clientDb.GetPhoneNumbers(id);
    await phones.forEach(element => { alert(element.phone) });
  });
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
