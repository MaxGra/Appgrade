Router.route('/',{
    template: 'login',
    name: 'main',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            if(Meteor.user().usertype == "teacher"){
                this.layout("teacherlayout");
                this.render("teacherkurse");
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


Router.route('/klassen',{ 
    name: 'klassen',
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "admin"){
            this.layout("adminlayout");
            this.render('adminklassen');
        }
        else{
            this.render("forbidden");
        }
      }
        else{
          Router.go("main");
        }
    }
});

Router.route('/kurse',{ 
    name: 'kurse',
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "teacher"){
            this.layout("teacherlayout");
            this.render('teacherkurse');
        }
        else{
            this.render("forbidden");
        }
      }
        else{
          Router.go("main");
        }
    }
});

Router.route('/kurse/:_id', {
    template: 'teacherselectedkurs',
    data: function(){
        var currentSubject = this.params._id;
        this.layout("teacherlayout");
        this.render('teachertable');
    }
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