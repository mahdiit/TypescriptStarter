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

function log(value: string) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor): any {

        const oldDescriptor = descriptor.value;

        descriptor.value = async function (...args: any) {
            console.log(`${value}, ${key}`);
            console.table(args);
            return await oldDescriptor.apply(target, args);
        }
    }
}

function log2(prefix: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`${prefix} - ${propertyKey}`);
    }
}

function memo() {
    const cache: { [k: string]: any } = {};
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const cacheKey = `__cacheKey__${args.toString()}`;
            console.log(cacheKey);
            if (!cache.hasOwnProperty(cacheKey)) {
                cache[cacheKey] = originalMethod.apply(this, args);
                console.log("cached! " + cacheKey);
            }else{
                console.log("from cache");
            }
            return cache[cacheKey];
        }
    }
}

export class ExampleClass {
    //@first()
    //@second()    
    //@catchError
    //@log("Sample config")
    @log2("sample prefix")
    @memo()
    method(index: number, param: string, isSuccess: boolean) {
        let rnd: Number;
        rnd = (new Date()).getTime() % 10;
        return rnd;
        //if (rnd < 5)
            //throw new Error("there is error here");
        //else
            //console.log("Ok!");
    }
}