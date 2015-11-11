Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var userVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(userVar, passwordVar,function(error){
                if(error){
                    console.log(error.reason);
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
        Accounts.createUser({
            username: userVar,
            password: passwordVar
        });
    }
});

Template.main.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});