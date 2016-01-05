Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var userVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(userVar, passwordVar,function(error){
                if(error){
                    console.log(error.reason);
                } else {
                    if(Meteor.user().isAdmin == true){
                        Router.go("mainteacher");
                    }
                    if(Meteor.user().isAdmin == false){
                        Router.go("mainstudent");
                    }
                }
        });
    }
});


Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var userVar = event.target.registerUsername.value;
        var passwordVar = event.target.registerPassword.value;
        var firstnameVar = event.target.registerFirstname.value;
        var lastnameVar = event.target.registerLastname.value;
        Accounts.createUser({
            username: userVar,
            password: passwordVar,
            firstName: firstnameVar,
            lastName: lastnameVar
        });
    }
});

Template.mainteacher.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.mainstudent.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});