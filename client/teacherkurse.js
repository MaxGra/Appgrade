Template.teacherkurse.helpers({
    years: function () {
      return years.select().fetch();
    },
    subject: function () {
      return subject.select().fetch();
    },
    teacherhassubject: function () {
      return teacherhassubject.select().fetch();
    }
});