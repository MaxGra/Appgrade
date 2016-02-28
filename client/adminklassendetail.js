Template.adminklassendetail.helpers({
    allstudents: function () {
        console.log(Meteor.users.find({}));
      return Meteor.users.find({'usertype' : 'student'});
    }
});
