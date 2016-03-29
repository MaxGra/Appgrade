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

    var yearsTable = {
        yearsid: ['$number'],
        yearsdesc: ['$string', '$notnull']
    };

    var subjectTable = {
        subjectid: ['$number'],
        yearsyearsid: ['$number'],
        subjectdesc: ['$string', '$notnull'],
        yearsid: ['$number'],
        yearsdesc: ['$string', '$notnull']
    };

    var teacherhassubjectTable  = {
        teacherhassubjectid: ['$number'],
        subjectsubjectid: ['$number'],
        userid: ['$string', '$notnull']
    };

    var competenceTable = {
        competenceid: ['$number'],
        subjectsubjectid: ['$number'],
        competencedesc: ['$string', '$notnull'],
        pointsmax: ['$number']
    };

    var descriptorTable = {
        descriptorid: ['$number'],
        competencecompetenceid: ['$number'],
        descriptordesc: ['$string', '$notnull'],
        pointsmax: ['$number']
    };

    var classTable = {
        classid: ['$number'],
        yearsyearsid: ['$number'],
        classdesc: ['$string', '$notnull'],
        yearsid: ['$number'],
        yearsdesc: ['$string', '$notnull']
   };

//    var teacherhassubjectTable = {
//        teacherhassubjectid: ['$number'],
//        subjectid: ['$number'],
//        userid: ['$string', '$notnull']
//    };

    var studenthasclassTable = {
        studenthasclassid: ['$number'],
        classclassid: ['$number'],
        userid: ['$string', '$notnull']
    };
//
//    var studenthascompetenceTable = {
//        studenthascompetenceid: ['$number'],
//        competencecompetenceid: ['$number'],
//        userid: ['$string', '$notnull'],
//        pointserached: ['$number']
//    };
//
    var studenthasdescriptorTable = {
        studenthasdescriptorid: ['$number'],
        descriptordescriptorid: ['$number'],
        userid: ['$string', '$notnull'],
        pointsreached: ['$number']
    };

//_______________________________________________


  teacherhassubject.createTable(teacherhassubjectTable);

    years.createTable(yearsTable);

    subject.createTable(subjectTable);

    competence.createTable(competenceTable);
//
  descriptor.createTable(descriptorTable);
//
    classes.createTable(classTable);

//    teacherhassubject.createTable(teacherhassubjectTable);

studenthasclass.createTable(studenthasclassTable);
//
//    studenthascompetence.createTable(studenthascompetenceTable);
//
 studenthasdescriptor.createTable(studenthasdescriptorTable);



//_______________________________________________






Tracker.autorun(function () {
    Meteor.subscribe("userData");
});



