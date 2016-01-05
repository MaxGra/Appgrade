Router.route('/',{
    template: 'login',
    name: 'login',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            if(Meteor.user().isAdmin == true){
                this.render("mainteacher");
            }
            if(Meteor.user().isAdmin == false){
                this.render("mainstudent");
            }
            
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

Router.route('/mainteacher',{
    template: 'mainteacher',
    name: 'mainteacher',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});

Router.route('/mainstudent',{
    template: 'mainstudent',
    name: 'mainstudent',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});