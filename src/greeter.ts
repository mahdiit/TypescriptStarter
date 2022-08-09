import helloWorld from "./hello";
import { pi, phi, absolute } from "./maths";
import { RegexValidator } from "./Validators/RegexValidator"

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
