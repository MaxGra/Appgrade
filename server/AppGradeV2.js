// Defining SQL collections. The additional paramater is the postgres connection string which will only run on the server

years = new SQL.Collection('years', 'postgres://postgres:pass@localhost/meteor');

subject = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');

competence = new SQL.Collection('competence', 'postgres://postgres:pass@localhost/meteor');

descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');

classes = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');

teacherhassubject = new SQL.Collection('teacherhassubject', 'postgres://postgres:pass@localhost/meteor');

studenthasclass = new SQL.Collection('studenthasclass', 'postgres://postgres:pass@localhost/meteor');

//studenthascompetence = new SQL.Collection('studenthascompetence', 'postgres://postgres:pass@localhost/meteor');

studenthasdescriptor = new SQL.Collection('studenthasdescriptor', 'postgres://postgres:pass@localhost/meteor');

subject.publish('subject', function(){
    return subject.select('subjectid', 'yearsyearsid', 'subjectdesc','yearsid', 'yearsdesc')
                .join(['INNER JOIN'], ["yearsyearsid"], [["years", 'yearsid']])
                .limit(100);
  });

teacherhassubject.publish('teacherhassubject', function(){
    return teacherhassubject.select('teacherhassubjectid', 'subjectsubjectid', 'userid').limit(100);
  });


years.publish('years', function(){
    return years.select('yearsid', 'yearsdesc').order('yearsid DESC').limit(100);
  });


classes.publish('class', function(){
    return classes.select('classid', 'yearsyearsid', 'classdesc', 'yearsdesc','yearsid')
        .join(['INNER JOIN'], ["yearsyearsid"], [["years", 'yearsid']])
        .limit(100);
  });



descriptor.publish('descriptor', function(){
    return descriptor.select('descriptorid', 'competencecompetenceid', 'descriptordesc', 'pointsmax').order('descriptorid DESC').limit(100);
  });

competence.publish('competence', function(){
    return competence.select('competenceid', 'subjectsubjectid', 'competencedesc', 'pointsmax').order('competenceid DESC').limit(100);
  });



studenthasclass.publish('studenthasclass', function(){
    return studenthasclass.select('studenthasclassid', 'classclassid', 'userid').limit(100);
  });

studenthasdescriptor.publish('studenthasdescriptor', function(){
    return studenthasdescriptor.select('studenthasdescriptorid', 'descriptordescriptorid', 'pointsreached', 'userid').limit(100);
  });


//_______________________________________________


//Servermethoden (Insert,Update,...)

 Meteor.methods({
    'getcompetences': function(id){
        return competence.select('subjectid', 'subjectdesc', 'competenceid', 'subjectsubjectid', 'competencedesc', 'pointsmax')
        .join(['INNER JOIN'], ["subjectsubjectid"], [["subject", 'subjectid']])
        .order('competenceid DESC')
        .limit(100);
    },
     'updatecompetence': function(id,desc,points){
         competence.update({        
         competencedesc: desc,
         pointsmax: points})
         .where("competenceid = ?", id)
         .save(); 
     },
     'deletecompetence': function(id){
         descriptor.remove()
         .where("competencecompetenceid = ?", id)
         .save();
         competence.remove()
         .where("competenceid = ?", id)
         .save();
         return true;
     },
     'deleteallstudentdata': function(id){
         studenthasdescriptor.remove()
         .where("descriptordescriptorid = ?", id)
         .save();
     },
     'deletestudentdata': function(id){
         studenthasdescriptor.remove()
         .where("userid = ?", id)
         .save();
     },
     'insertcompetence': function(selectedSubject,pointsmaxVar){
        competence.insert({
        subjectsubjectid: selectedSubject,
        competencedesc: "Neue Kompetenz",
        pointsmax: pointsmaxVar
        }).save();
        return true;
     },
     'insertdescriptor': function(selectedCompetence,newdescdesc,newdescpoints){
        descriptor.insert({
        competencecompetenceid: selectedCompetence,
        descriptordesc: newdescdesc,
        pointsmax: newdescpoints
        }).save();
        return true;
     },
     'updatedescriptor': function(selecteddesc,newdescdesc,newdescpoints){
        descriptor.update({
        descriptordesc: newdescdesc,
        pointsmax: newdescpoints})
        .where('descriptorid = ?',selecteddesc)
        .save();         
     },
     'getdescriptorpoints': function(userid){
         return studenthasdescriptor.select().where('userid = ?', userid).limit(100);
     },
     'insertsubject': function(subjectdesc,yearsid){
        subject.insert({
            subjectdesc: subjectdesc,
            yearsyearsid: yearsid
        }).save();
         return true;
     },
     'updatesubject': function(subjectdesc,subjectyear,subjectid){
        subject.update({
            subjectdesc: subjectdesc,
            yearsyearsid: subjectyear
        }).where('subjectid = ?',subjectid).save();
         return true;         
     }
});


//Mongodb Test

Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);

//Registeruser Helper

Accounts.onCreateUser(function(options, user) {
  user.firstName = options.firstName;
  user.lastName = options.lastName;
  user.usertype = options.usertype;
  return user;
});

//Find all User in Meteor Users

Meteor.publish('userData', function() {
   return Meteor.users.find({}, {fields:{'_id':1,'username':1,'firstName':1,'lastName':1,'usertype':1}})
 })

Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return YourFileCollection.find();
});



