Template.teacherselect.helpers({
    classes: function () {
      return classes.select().fetch();
    }
});

Template.teacherselect.events({
    "submit .createnewsubject": function (event) {
        event.preventDefault();
        var subjectname = event.target.subjectname.value;
        var selectedclass = event.target.selectedclass.value;
        var subjectarray = subject.select().order('subjectid').fetch();
        var last_subject = subjectarray[subjectarray.length-1];
        subject.insert({
          subjectid: last_subject.subjectid+1,
          subjectdesc:subjectname
        }).save();
        var classselect = classes.select().where("classdesc = ?", selectedclass).fetch();
        subjecthasclass.insert({
            classid: classselect[0].classid,
            subjectid: last_subject.subjectid+1
        }).save();
        event.target.subjectname.value = "";
    }
});