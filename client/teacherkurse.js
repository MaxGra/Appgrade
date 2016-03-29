Template.teacherkurse.helpers({
    dataset: function(){

        var currentUser = Meteor.userId();
        var data = subject.select().join(['OUTER JOIN'], ['subjectid'],[["teacherhassubject","subjectsubjectid"]]).where('userid= ?',currentUser).fetch();        
        
        for (var i = 0; i < data.length; i++) {
                var yearsid = data[i].yearsyearsid;
                var classesdata = classes.select().where('yearsyearsid= ?', yearsid).fetch();
                data[i].classes= classesdata;
            }
        
        return data;
    }
});