Template.teachertable.events({
    "click .kompedit": function(event) {
        $('.kompstatemode').addClass("hide");
        $('.kompeditmode').removeClass("hide");
    },
    "click .kompsafe": function(event) {
        $('.kompeditmode').addClass("hide");
        $('.kompstatemode').removeClass("hide");
    },
    'click .editcomp': function(event) {
    event.preventDefault();
    
    $('#competenceModal').modal('show');
        
    var selectedcomp = event.target.getAttribute('data-compid')
    Session.set('selectedCompetence', selectedcomp);
        console.log(selectedcomp);
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