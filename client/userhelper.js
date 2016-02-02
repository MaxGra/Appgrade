Template.teacherlayout.helpers({
    showname: function (){
        return Meteor.user().firstName+" "+Meteor.user().lastName;
    }
});

Template.adminlayout.helpers({
    showname: function (){
        return Meteor.user().firstName+" "+Meteor.user().lastName;
    }
});

Template.studentlayout.helpers({
    showname: function (){
        return Meteor.user().firstName+" "+Meteor.user().lastName;
    }
});