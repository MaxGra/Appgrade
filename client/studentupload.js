Meteor.subscribe("fileUploads");
    Template.uploadModal.events({
      'click #deleteFileButton ': function (event) {
        console.log("deleteFile button ", this);
        YourFileCollection.remove({_id:this._id});
        
      },
      'change .your-upload-class': function (event, template) {
          
      var label = $('.your-upload-class').val().replace(/\\/g, '/').replace(/.*\//, '');    
      
      $('.uploadname').val(label);
          
    console.log("uploading...")
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);
      yourFile.creatorId = Meteor.userId(); 
      yourFile.descriptorId = Session.get('selectedDesc');
      YourFileCollection.insert(yourFile, function (err, fileObj) {
        console.log("callback for the insert, err: ", err);
        if (!err) {
          console.log("inserted without error");
        }
        else {
          console.log("there was an error", err);
        }
      });
    });
  }
});

Template.uploadModal.helpers({
  theFiles: function () {
      var descid = Session.get('selectedDesc');
      descid = Number(descid);
    return YourFileCollection.find({descriptorId:descid,creatorId:Meteor.userId()});
  },
    descriptor: function(){
        return Session.get('selectedDescName')
    }
});