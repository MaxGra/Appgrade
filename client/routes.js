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
          this.next();
        }
    }
});

Router.route('/klassen/:_id',{
    name: "klassenid",
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "admin"){
            this.layout("adminlayout");
            this.render('adminklassendetail');
            
        }
        else{
            this.render("forbidden");
            this.next();
        }
      }
        else{
          Router.go("main");
          this.next();
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

//Router.route('/posts/:_id', function() {
//    this.render('post', {
//    data: function(){  
//     var test = competence.select().fetch();
//        console.log(test);
//        return test;
//    }
//  });  
//});

Router.route('/kurse/:_id',function(){
    var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "teacher"){
            this.layout("teacherlayout");
            this.render('teachertable', {
            data: function(){
                var currentid = this.params._id;
                var id = Number(currentid);
                var competencesdata = competence.select().where('subjectsubjectid= ?', id).fetch();
                    for (var i = 0; i < competencesdata.length; i++) {
                        var compid = competencesdata[i].competenceid;
                        var descriptordata = descriptor.select().where('competencecompetenceid= ?', compid).fetch();
                        
                        competencesdata[i].descriptors= descriptordata;
                    }
                return [competencesdata];
                }
            });  
        }
        else{
            this.render("forbidden");
        }
      }
        else{
          Router.go("main");
        }
});


//this.layout("teacherlayout");
//    this.render('teachertable', {
//    data: function(){
//        var currentid = this.params._id;
//        var id = Number(currentid);
//        var competences = competence.select().where('subjectsubjectid= ?', id).fetch();
//        console.log('test');
//        var datas =[];
//        return [competence.select().where('subjectsubjectid= ?', id).fetch(), {tests:{probe:'test'}}]
//    }
//});  



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