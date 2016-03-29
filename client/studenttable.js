Template.studenttable.helpers({
    subjects: function () {
        
        var id = Meteor.userId();
        var studhasclassdat = studenthasclass.select()
            .where('userid = ?', id)
            .fetch();
        var classid = studhasclassdat[0].classclassid;
        classid = Number(classid);
        
        var classesdat = classes.select().where('classid = ?',classid).fetch();
        var yearsid = classesdat[0].yearsyearsid;
        yearsid = Number(yearsid);
        
        var data = subject.select().where('yearsyearsid = ?',yearsid).fetch();
        
        
        return data;
    }
});

Template.studentsubject.helpers({
    dataset: function(){
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
    },
    "click .upload": function(event){
        $('#uploadModal').modal('show');
        var descid = event.target.getAttribute('data-descid');
        var descdesc = event.target.getAttribute('data-descdesc');
        descid = Number(descid);
        Session.set('selectedDesc',descid);
        Session.set('selectedDescName',descdesc);
    }
});
