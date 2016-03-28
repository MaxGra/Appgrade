Template.studenttable.helpers({
    subjects: function () {
        console.log("test");
        
        var id = Meteor.userId();
        var studhasclassdat = studenthasclass.select()
            .where('userid = ?', id)
            .fetch();
        var classid = studhasclassdat[0].classclassid;
        classid = Number(classid);
        
        var classesdat = classes.select().where('classid = ?',classid).fetch();
        var yearsid = classesdat[0].yearsyearsid;
        yearsid = Number(yearsid);
        console.log(yearsid); 
        
        var data = subject.select().where('yearsyearsid = ?',yearsid).fetch();
        
        console.log(data);
        
        return data;
    }
});

Template.studentsubject.helpers({
    dataset: function(){
        console.log(this);
        return this;
    }
});

Template.studenttable.events({
    "click .subject": function(event) {
        event.preventDefault();
        var subid = event.target.getAttribute('data-subid');
        subid = Number(subid);
        Router.go('studentsubject', {_id: subid});
    }
});

Template.studentsubject.events({
    "click .back": function(event) {
        event.preventDefault();
        Router.go("main");
    },
    "click .refresh": function(){
        Meteor._reload.reload(); 
    }
});
