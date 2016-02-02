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
        
        var id = subject.insert({
          subjectdesc:subjectname
        }).save();
        console.log('id',id);
        
        var classselect = classes.select().where("classdesc = ?", selectedclass).fetch();
        
        subjecthasclass.insert({
            classid: classselect[0].classid,
            subjectid: last_subject.subjectid+1
        }).save();
        
        teacherhassubject.insert({
            subjectid: last_subject.subjectid+1,
            userid: Meteor.userId()
        }).save();
        
        event.target.subjectname.value = "";
    }
});