Router.route('/',{
    name: 'home',
    template: 'main'
});

Router.route('/items',{
    name: 'items',
    template: 'items'
});

Router.route('/login',{
    name: 'login',
    template: 'login'
});

Router.configure({
    layoutTemplate: 'main'
});

