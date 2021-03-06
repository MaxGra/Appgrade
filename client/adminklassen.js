Template.adminklassen.helpers({
    classes: function () {
        return this[0];
    },
    years: function (){
        return this[1];
    }
});



Template.adminklassen.events({
    "click .addclass": function(event) {
        var classinput = $('.classinput').val();
        var jahrgangsel = $('.selectedyear option:selected').attr('data-yearsid');
        var jahrgangselValue = $('.selectedyear option:selected').val();
        if(classinput.replace(/\s/g,'') == ""){
            $('.inputerror').removeClass("hide");
        }
        else{
            $('.inputerror').addClass("hide");
            classes.insert({
            yearsyearsid: jahrgangsel,
            classdesc: classinput
        }).save();
            Meteor._reload.reload();
        }
    },
    "click .classlink": function(event) {
        var link = $(event.target).parent().attr('data-link');
        Router.go('klassenid', {_id: link});
    },
    "click .refresh": function(){
        Meteor._reload.reload(); 
    }
});