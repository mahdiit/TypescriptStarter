requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../src'
    }
});

requirejs(['app/greeter']);