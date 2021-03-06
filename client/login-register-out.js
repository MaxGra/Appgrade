Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var userVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(userVar, passwordVar,function(error){
                if(error){
                    console.log(error.reason);
                    $('.errormsg').removeClass("hide");
                    $('.errormsg').text(error.reason);
                } else {
                    
                    Router.go("main");
                    
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
        var usertypeVar = event.target.registerUsertype.value;
        Accounts.createUser({
            username: userVar,
            password: passwordVar,
            firstName: firstnameVar,
            lastName: lastnameVar,
            usertype: usertypeVar
        });
    }
});

Template.adminlayout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.studentlayout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.teacherlayout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});