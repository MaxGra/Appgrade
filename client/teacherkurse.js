Template.teacherkurse.helpers({
//    dataset: function(){
//      return teacherhassubject.select('subject.yearsdesc', 'subject.subjectdesc')
//      .join(['OUTER JOIN'], ["subjectsubjectid"], [["subject", ['subjectid']]])
// //     .join(['OUTER JOIN'], ['yearsyearsid'], [['years', ['yearsid']]])
//      .where('userid = ceic34fLMYPp7bFit')
//      .fetch();
//    }
    
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
    competence: function () {
      return competence.select().where('subjectid = 4').fetch();
    },
//    descriptor: function () {
//      return descriptor.select().fetch();
//    }
});