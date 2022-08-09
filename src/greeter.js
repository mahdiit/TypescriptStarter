define(["require", "exports", "./hello", "./maths", "./Validators/RegexValidator"], function (require, exports, hello_1, maths_1, RegexValidator_1) {
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
    var btn = document.getElementById("btnTest");
    btn.onclick = function () {
        var inputText = document.getElementById("inputText");
        var testText = document.getElementById("regexTest");
        var ex = eval("/^" + testText.value + "$/");
        console.log(ex);
        var regex = new RegexValidator_1.RegexValidator(ex);
        document.getElementById("result").textContent = regex.isAcceptable(inputText.value).toString();
    };
});
