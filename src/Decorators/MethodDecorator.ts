function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
        console.table(target);
        console.table(descriptor);
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called ");
        console.table(target);
        console.table(descriptor);
    };
}

export class ExampleClass {
    @first()
    @second()
    method() { }
}