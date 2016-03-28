Template.adminklassendetail.helpers({
    allstudents: function () {
      return Meteor.users.find({'usertype' : 'student'});
    },
    classstudents: function(){
        return this;
    }
});


Template.adminklassendetail.events({
    "click .name": function(event) {
        if($("#studenlist_all").find(".activeListItem").length){
            $("#studenlist_all").find(".activeListItem").removeClass("activeListItem").addClass("nonactiveListItem")
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");
        }else{
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");        
        }
        
        if($("#studenlist_class").find(".activeListItem").length){
            $("#studenlist_class").find(".activeListItem").removeClass("activeListItem").addClass("nonactiveListItem")
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");
        }else{
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");        
        }
        
    },
    "click .switch": function(event){
        if($("#studenlist_all").find(".activeListItem").length){
           var userid = $("#studenlist_all").find(".activeListItem").attr("data-id");
           var classid = Session.get('selectedClass');
           classid = Number(classid);
           var studexist = false;
           for(var i =0; i<this.length;i++){
               if(this[i].userid == userid){
                   studexist =  true;
               }
           }
           if(!studexist){
               console.log("neuer");
               studenthasclass.insert({
                    classclassid: classid,
                    userid: userid
               }).save();
           }else{
              alert("Schüler bereits vorhanden")
           }
        }   
    },
    "click .deletestudent":function(event){
       if($("#studenlist_class").find(".activeListItem").length){
          var userid = $("#studenlist_class").find(".activeListItem").attr("data-id");
          if (confirm('Schüler wirklich aus der Klassen entfernen? Alle Benotungen für diesen Schüler werden gelöscht')) {
                    console.log("remove")
                    studenthasclass.remove().where('userid = ?',userid).save();
                    studenthasdescriptor.remove().where('userid = ?',userid).save();
//                    Meteor.call('deletestudentdata',userid, function(error,result){
//                    });
            } else {
                // Do nothing!
            }
       } 
    },
    "click .back": function(event) {
        event.preventDefault();
        Router.go("klassen");
    }
});
