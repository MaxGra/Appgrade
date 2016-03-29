Template.useruploads.helpers({
  theFiles: function () {  
    var descid = Session.get('selectedDescId');
    var userid = Session.get('userid');
    descid = Number(descid);
    return YourFileCollection.find({descriptorId:descid,creatorId:userid});
  },
    descriptorname: function(){
        return Session.get('selectedDescName');
    },
    name: function(){
        var userid = Session.get('userid');
        var data = Meteor.users.find({_id : userid}).fetch();
        return data[0].lastName+" "+data[0].firstName;
    }
});