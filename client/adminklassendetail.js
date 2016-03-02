Template.adminklassendetail.helpers({
    allstudents: function () {
        console.log(Meteor.users.find({}));
      return Meteor.users.find({'usertype' : 'student'});
    }
});


Template.adminklassendetail.events({
    "click .classlink": function(event) {
        console.log("click");
        var link = $(event.target).parent().attr('data-link');
        Router.go('klassenid', {_id: link});
    }
});
