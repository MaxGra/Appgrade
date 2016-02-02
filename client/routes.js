Router.route('/',{
    template: 'login',
    name: 'login',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            if(Meteor.user().usertype == "teacher"){
                this.layout("teacherlayout");
                this.render("teacherselect");
            }
            if(Meteor.user().usertype == "student"){
                this.layout("studentlayout");
                this.render("studenttable");
            }
            if(Meteor.user().usertype == "admin"){
                this.layout("adminlayout");
                this.render("adminmain");
            }
            
        } else {
            this.next();
        }
    }
});

Router.route('/register', function () {
    this.render('register');
});

Router.route('/klassen', function () {
    this.render('test');
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