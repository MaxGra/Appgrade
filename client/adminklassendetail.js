Template.adminklassendetail.helpers({
    allstudents: function () {
      return Meteor.users.find({'usertype' : 'student'});
    },
    classstudents: function(){
        return this;
    }
});


Template.adminklassendetail.events({
    "click .classlink": function(event) {

    }
});
