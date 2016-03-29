Router.configure({
//    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});



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
            this.render('adminklassen',{
                data: function(){
                    var classdata = classes.select().fetch();
                    var yearsdata = years.select().fetch();
                    return [classdata,yearsdata];
                }
            });
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
            this.render('adminklassendetail',{
                
                data: function(){
                    var selectedClass = this.params._id;
                    selectedClass = Number(selectedClass);
                    Session.set('selectedClass',selectedClass);
                    var data = studenthasclass.select().where('classclassid = ?', selectedClass).fetch();
                    for(var i = 0; i < data.length; i++){
                        var user = Meteor.users.find({'_id' : data[i].userid}).fetch();
                        data[i].firstname = user[0].firstName;
                        data[i].lastname = user[0].lastName;
                    }
                    return data;
                }
            });
            
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

Router.route('/faecher',{ 
    name: 'faecher',
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "admin"){
            this.layout("adminlayout");
            this.render('adminfaecher',{
                data: function(){
                    var subjectdata = subject.select().fetch();
                    var yearsdata = years.select().fetch();
                    return [subjectdata,yearsdata];
                }
            });
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

Router.route('/faecher/:_id',{ 
    name: 'faecherid',
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "admin"){
            this.layout("adminlayout");
            this.render('adminfaecherdetail',{
                data: function(){
                    var selectedSubject = this.params._id;
                    selectedSubject = Number(selectedSubject);
                    Session.set('selectedSubject',selectedSubject);
                    var data = teacherhassubject.select().where('subjectsubjectid = ?', selectedSubject).fetch();
                    for(var i = 0; i < data.length; i++){
                        var user = Meteor.users.find({'_id' : data[i].userid}).fetch();
                        data[i].firstname = user[0].firstName;
                        data[i].lastname = user[0].lastName;
                        
                    }
                    
                    var subjectinfo = subject.select().where('subjectid = ?', selectedSubject).fetch();
                    
                    return [data,subjectinfo];
                }
            });
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

Router.route('/fach/:_id',{
    name: "studentsubject",
    onBeforeAction: function () {
        var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "student"){
            this.layout("studentlayout");
            this.render('studentsubject',{
                
                data: function(){
                    
                    
        var selectedSubject = this.params._id;
        selectedSubject = Number(selectedSubject);
        Session.set('selectedSubject',selectedSubject);
        var studentid = Meteor.userId();
        
                        var competencesstudentdata = competence.select().where('subjectsubjectid= ?', selectedSubject).fetch();
                        for (var i = 0; i < competencesstudentdata.length; i++) {
                        var compid1 = competencesstudentdata[i].competenceid;
                        var descriptorstudentsdata = descriptor.select().where('competencecompetenceid= ?', compid1).fetch();
                        var points = 0;
                        for(var k = 0; k < descriptorstudentsdata.length; k++){
                            
                            var pointsdata = studenthasdescriptor.select().where('userid = ? AND descriptordescriptorid = ?', studentid, descriptorstudentsdata[k].descriptorid).fetch();
                            
                            if(pointsdata.length > 0){
                            
                            descriptorstudentsdata[k].pointsreached = pointsdata[0].pointsreached;
                            points+= Number(descriptorstudentsdata[k].pointsreached);
                            descriptorstudentsdata[k].studhasdescid = pointsdata[0].studenthasdescriptorid;    
                                
                            }else{
                            descriptorstudentsdata[k].pointsreached = 0;
                            descriptorstudentsdata[k].studhasdescid = 0;
                            }
                            
                           if(descriptorstudentsdata[k].pointsreached < descriptorstudentsdata[k].pointsmax/2){
                               descriptorstudentsdata[k].status = "danger";
                           };
                           if(descriptorstudentsdata[k].pointsreached >= descriptorstudentsdata[k].pointsmax/2){
                               descriptorstudentsdata[k].status = "warning";
                           };
                           if(descriptorstudentsdata[k].pointsreached == descriptorstudentsdata[k].pointsmax){
                               descriptorstudentsdata[k].status = "success";
                           }; 
                            
                        }
                        
                        competencesstudentdata[i].descriptorsdata= descriptorstudentsdata;
                        competencesstudentdata[i].pointsreached = points;
                        
                    }
        
        
        

        
        return competencesstudentdata;            
                    
                }
                
            });
            
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


Router.route('/kurse/:_id/:_class',function(){
    var currentUser = Meteor.userId();
        if(currentUser){
        if(Meteor.user().usertype == "teacher"){
            this.layout("teacherlayout");
            this.render('teachertable', {
            data: function(){
                var currentid = this.params._id;
                var currentclass = this.params._class;
                Session.set('selectedSubject', currentid);
                Session.set('selectedClass', currentclass);
                var id = Number(currentid);
                var classid = Number(currentclass);
                
                var competencesdata = competence.select().where('subjectsubjectid= ?', id).fetch();
                    for (var i = 0; i < competencesdata.length; i++) {
                        var compid = competencesdata[i].competenceid;
                        var descriptordata = descriptor.select().where('competencecompetenceid= ?', compid).fetch();
                        
                        competencesdata[i].descriptors= descriptordata;
                    }
                
                var studentsdata = [];
                var studentinclassdata = studenthasclass.select().where('classclassid= ?', classid).fetch();
                for (var j = 0; j < studentinclassdata.length; j++){
                    var studentid = studentinclassdata[j].userid;
                    var student = Meteor.users.findOne({_id : studentid},{fields:{'firstName':1,'lastName':1}});
                    
                    var competencesstudentdata = competence.select().where('subjectsubjectid= ?', id).fetch();
                    for (var i = 0; i < competencesstudentdata.length; i++) {
                        var compid1 = competencesstudentdata[i].competenceid;
                        var descriptorstudentsdata = descriptor.select().where('competencecompetenceid= ?', compid1).fetch();
                        
                        for(var k = 0; k < descriptorstudentsdata.length; k++){
                            
                            var pointsdata = studenthasdescriptor.select().where('userid = ? AND descriptordescriptorid = ?', studentid, descriptorstudentsdata[k].descriptorid).fetch();
                            
                            if(pointsdata.length > 0){
                            
                            descriptorstudentsdata[k].pointsreached = pointsdata[0].pointsreached;
                            descriptorstudentsdata[k].studhasdescid = pointsdata[0].studenthasdescriptorid;    
                                
                            }else{
                            descriptorstudentsdata[k].pointsreached = 0;
                            descriptorstudentsdata[k].studhasdescid = 0;
                            }
                            
                           if(descriptorstudentsdata[k].pointsreached < descriptorstudentsdata[k].pointsmax/2){
                               descriptorstudentsdata[k].status = "danger";
                           };
                           if(descriptorstudentsdata[k].pointsreached >= descriptorstudentsdata[k].pointsmax/2){
                               descriptorstudentsdata[k].status = "warning";
                           };
                           if(descriptorstudentsdata[k].pointsreached == descriptorstudentsdata[k].pointsmax){
                               descriptorstudentsdata[k].status = "success";
                           }; 
                            
                        }
                        
                        competencesstudentdata[i].descriptorsdata= descriptorstudentsdata;
                        
                        
                    }
                    
                    studentsdata.push({ 'student' : student, 'competencesdata' : competencesstudentdata });
                    
                    
                    
                }
                
                
                return [competencesdata,studentsdata];
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

