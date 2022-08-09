requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../dist'
    }
});

requirejs(['app/greeter']);