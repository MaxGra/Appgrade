Template.teacherkurse.helpers({
    dataset: function(){
//      var data = teacherhassubject.select('subject.yearsdesc', 'subject.subjectdesc', 'subject.subjectid', 'subject.yearsyearsid')
//      .join(['OUTER JOIN'], ["subjectsubjectid"], [["subject", ['subjectid']]])
//      .where('userid = "ceic34fLMYPp7bFit"')
//      .fetch();
//        
//        for (var i = 0; i < data.length; i++) {
//                var yearsid = data[i].yearsyearsid;
//                var classesdata = classes.select().where('yearsyearsid= ?', yearsid).fetch();
//                data[i].classes= classesdata;
//            }
//        console.log(data);
//            return data;
        
        var currentUser = Meteor.userId();
        var data = subject.select().join(['OUTER JOIN'], ['subjectid'],[["teacherhassubject","subjectsubjectid"]]).where('userid= ?',currentUser).fetch();        
        
        for (var i = 0; i < data.length; i++) {
                var yearsid = data[i].yearsyearsid;
                var classesdata = classes.select().where('yearsyearsid= ?', yearsid).fetch();
                data[i].classes= classesdata;
            }
        
        console.log(data);
        return data;
    }
    
//    dataset: function(){
//       return teacherhassubject.select('subjectdesc').fetch();
//    }
//    years: function () {
//      return years.select().fetch();
//    },
//    subject: function () {
//      return subject.select().fetch();
//    },
//    teacherhassubject: function () {
//      return teacherhassubject.select().fetch();
//    }
//    competence: function () {
//      return competence.select().fetch();
//    },
//    descriptor: function () {
//      return descriptor.select().fetch();
//    }
});