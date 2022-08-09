requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../dist',
        jquery: 'jquery-3.6.0.min'
    }
});

requirejs(['app/greeter']);