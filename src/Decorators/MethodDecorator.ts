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

function catchError(target: any, propertyName: any, descriptor: any) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any) {
        try {
            return await method.apply(target, args);
        } catch (error) {
            console.log(`${target.constructor.name}#${propertyName}`);
            console.log(`catched error: ${error.message}`);
        }
    };
}

export class ExampleClass {
    //@first()
    //@second()
    @catchError
    method() {
        let rnd: Number;
        rnd = (new Date()).getTime() % 10;
        if (rnd < 5)
            throw new Error("there is error here");
        else
            console.log("Ok!");
    }
}