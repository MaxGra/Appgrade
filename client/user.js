Template.mainteacher.helpers({
    showname: function (){
        return Meteor.user().firstName+" "+Meteor.user().lastName;
    }
});