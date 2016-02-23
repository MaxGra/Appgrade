// Defining SQL collections. The additional paramater is the postgres connection string which will only run on the server

years = new SQL.Collection('years', 'postgres://postgres:pass@localhost/meteor');

subject = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');

competence = new SQL.Collection('competence', 'postgres://postgres:pass@localhost/meteor');

descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');

classes = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');

teacherhassubject = new SQL.Collection('teacherhassubject', 'postgres://postgres:pass@localhost/meteor');

studenthasclass = new SQL.Collection('studenthasclass', 'postgres://postgres:pass@localhost/meteor');

studenthascompetence = new SQL.Collection('studenthascompetence', 'postgres://postgres:pass@localhost/meteor');

studenthasdescriptor = new SQL.Collection('studenthasdescriptor', 'postgres://postgres:pass@localhost/meteor');


//_______________________________________________


//teacherhassubject.insert({subjectid: 2, userid: 'test'}); -+

//subject.insert({subjectdesc:'all'}).save();

//username.insert({name:'all'}).save();


//_______________________________________________

//  teacherhassubject.publish('teacherhassubject', function(){
//    tryout = teacherhassubject.select('subjectdesc', 'userid', 'subjectsubjectid')
//                .join(['INNER JOIN'], ["subjectsubjectid"], [["subject", 'subjectid']])
//                .limit(100);
//    return tryout.join(['INNER JOIN'], ["yearsyearsid"], [["years", 'yearsid']])
//                .where("userid = 'ceic34fLMYPp7bFit'")
//  });

subject.publish('subject', function(){5
    return subject.select('yearsid', 'yearsdesc', 'subjectid', 'yearsyearsid', 'subjectdesc')
                .join(['INNER JOIN'], ["yearsyearsid"], [["years", 'yearsid']])
                .limit(100);
  });

teacherhassubject.publish('teacherhassubject', function(){
    return teacherhassubject.select('teacherhassubjectid', 'subjectsubjectid', 'userid').limit(100);
  });

//subject.publish('subject', function(){
//    return subject.select('subjectid', 'yearsyearsid', 'subjectdesc').limit(100);
//  });

years.publish('years', function(){
    return years.select('yearsid', 'yearsdesc').limit(100);
  });

//classes.publish('class', function(){
//    return classes.select('classid', 'yearsyearsid', 'classdesc').limit(100);
//  });


competence.publish('competence', function(){
    return competence.select('subjectid', 'subjectdesc', 'competenceid', 'subjectsubjectid', 'competencedesc', 'pointsmax')
        .join(['INNER JOIN'], ["subjectsubjectid"], [["subject", 'subjectid']])
        .limit(100);
  });

//descriptor.publish('descriptor', function(){
//    return descriptor.select('descriptorid', 'competencecompetenceid', 'descriptordesc', 'pointsmax').limit(100);
//  });

//studenthasclass.publish('studenthasclass', function(){
//    return studenthasclass.select('studenthasclassid', 'classclassid', 'userid').limit(100);
//  });
//
//studenthascompetence.publish('studenthascompetence', function(){
//    return studenthascompetence.select('studenthascompetenceid', 'competencecompetenceid', 'userid', 'pointsreached').limit(100);
//  });
//
//studenthasdescriptor.publish('studenthasdescriptor', function(){
//    return studenthasdescriptor.select('studenthasdescriptorid', 'descriptordescriptorid', 'userid', 'pointsreached').limit(100);
//  });


//_______________________________________________



Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);

Accounts.onCreateUser(function(options, user) {
  user.firstName = options.firstName;
  user.lastName = options.lastName;
  user.usertype = options.usertype;
  return user;
});


