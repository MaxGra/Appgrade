Template.adminfaecher.helpers({
    subjects: function () {
        return this[0];
    },
    years: function (){
        return this[1];
    }
});



Template.adminfaecher.events({
    "click .addsubject": function(event) {
        console.log("add");
        var subjectinput = $('.subjectinput').val();
        var jahrgangsel = $('.selectedyear option:selected').attr('data-yearsid');
        jahrgangsel = Number(jahrgangsel);
        if(subjectinput.replace(/\s/g,'') == ""){
            $('.inputerror').removeClass("hide");
        }
        else{
            $('.inputerror').addClass("hide");
            console.log(subjectinput,jahrgangsel);
                Meteor.call('insertsubject',subjectinput,jahrgangsel, function(error,result){
                });
                Meteor._reload.reload();
        }
    },
    "click .subjectlink": function(event) {
        var link = $(event.target).parent().attr('data-link');
        Router.go('faecherid', {_id: link});
    }
});