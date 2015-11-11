Router.route('/',{
    template: 'login',
    name: 'login',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.render("main");
        } else {
            this.next();
        }
    }
});

Router.route('/register', function () {
    this.render('register');
});

Router.route('/test', function () {
    this.render('test');
    this.layout('main');
});

Router.route('/main',{
    template: 'main',
    name: 'main',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});