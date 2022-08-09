define(["require", "exports", "./hello", "./maths", "jquery"], function (require, exports, hello_1, maths_1, jquery_1) {
    "use strict";
    exports.__esModule = true;
    (0, hello_1["default"])();
    console.log(maths_1.pi);
    var absPhi = (0, maths_1.absolute)(maths_1.phi);
    var Student = /** @class */ (function () {
        function Student(firstName, middleInitial, lastName) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
        return Student;
    }());
    function greeter(person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    var user = new Student("Jane", "M.", "User");
    document.getElementById("message").textContent = greeter(user);
    (0, jquery_1["default"])(function () {
        alert('Loaded');
    });
});
