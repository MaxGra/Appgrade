Template.adminklassen.helpers({
    classes: function () {
      return classes.select().fetch();
    }
});



Template.adminklassen.events({
    "click .classlink": function(event) {
        console.log("click");
        var link = $(event.target).parent().attr('data-link');
        Router.go('klassenid', {_id: link});
    }
});