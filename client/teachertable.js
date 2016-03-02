Template.teachertable.events({
    "click .kompedit": function(event) {
        event.preventDefault();
        $('.kompstatemode').addClass("hide");
        $('.kompeditmode').removeClass("hide");
    },
    "click .kompsafe": function(event) {
        event.preventDefault();
        $('.kompeditmode').addClass("hide");
        $('.kompstatemode').removeClass("hide");
    },
    "click .editcomp": function(event) {
        event.preventDefault();

        var selectedcomp = event.target.getAttribute('data-compid')
        Session.set('selectedCompetence', selectedcomp);
        
        console.log(selectedcomp);
        
        $('#competenceModal').modal('show');
    },
    "click .newcomp": function(event) {
        event.preventDefault();
        
        var selectedSubject = Session.get('selectedSubject');
        selectedSubject = Number(selectedSubject);
        
        var pointsmaxVar= 100;
        
        Meteor.call('insertcompetence',selectedSubject,pointsmaxVar, function(error,result){
            if (result == true){
              Meteor._reload.reload(); 
            }
        });
        
        //Meteor._reload.reload();
        
    }
});

//Template.teachertable.helpers({
//    usernames: function () {
//      return username.select().fetch();
//    },
//    subjects: function() {
//          return subject.select().fetch();
//    },
//    descriptors: function() {
//          return descriptor.select().fetch();
//    }
//});

Template.teachertable.helpers({
    competences: function () {
        console.log(this[0]);
        console.log(this);
      return this[0];
    }
});

//Template.teachertable.helpers({
//    competences: function () {
//      return competence.select().fetch();
//    }
//});