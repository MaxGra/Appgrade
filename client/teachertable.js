Template.teachertable.events({
    "click .kompedit": function(event) {
        $('.kompstatemode').addClass("hide");
        $('.kompeditmode').removeClass("hide");
    },
    "click .kompsafe": function(event) {
        $('.kompeditmode').addClass("hide");
        $('.kompstatemode').removeClass("hide");
    }
});

Template.teachertable.helpers({
    usernames: function () {
      return username.select().fetch();
    },
    subjects: function() {
          return subject.select().fetch();
    },
    descriptors: function() {
          return descriptor.select().fetch();
    }
});