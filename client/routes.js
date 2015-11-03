Router.route('/', function () {
  this.render('login');
});

Router.route('/items', function () {
  this.render('items');
});

Router.configure({
    layoutTemplate: 'main'
});
