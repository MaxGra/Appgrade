Template.teacherkurse.helpers({
//    dataset: function(){
//      return subject.select('years.yearsdesc', 'subject.subjectdesc')
//      .join(['OUTER JOIN'], ['yearsyearsid'], [['years', ['yearsid']]])
//      .fetch();
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
      return competence.select().fetch();
    },
    descriptor: function () {
      return descriptor.select().fetch();
    }
});