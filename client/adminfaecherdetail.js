Template.adminfaecherdetail.helpers({
    allteachers: function () {
      return Meteor.users.find({'usertype' : 'teacher'});
    },
    subjectteachers: function(){
        return this;
    }
});


Template.adminfaecherdetail.events({
    "click .name": function(event) {
        if($("#teacherlist_all").find(".activeListItem").length){
            $("#teacherlist_all").find(".activeListItem").removeClass("activeListItem").addClass("nonactiveListItem")
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");
        }else{
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");        
        }
        
        if($("#teacherlist_class").find(".activeListItem").length){
            $("#teacherlist_class").find(".activeListItem").removeClass("activeListItem").addClass("nonactiveListItem")
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");
        }else{
            $(event.target).parent().addClass("activeListItem").removeClass("nonactiveListItem");        
        }
        
    },
    "click .switch": function(event){
        if($("#teacherlist_all").find(".activeListItem").length){
           var userid = $("#teacherlist_all").find(".activeListItem").attr("data-id");
           var subjectid = Session.get('selectedSubject');
           subjectid = Number(subjectid);
           var teachexist = false;
           for(var i =0; i<this.length;i++){
               if(this[i].userid == userid){
                   teachexist =  true;
               }
           }
           if(!teachexist){
               console.log("neuer");
               teacherhassubject.insert({
                    subjectsubjectid: subjectid,
                    userid: userid
                }).save();
           }else{
              alert("Schüler bereits vorhanden")
           }
        }   
    },
    "click .deleteteacher":function(event){
       if($("#teacherlist_class").find(".activeListItem").length){
          var userid = $("#teacherlist_class").find(".activeListItem").attr("data-id");
          if (confirm('Trainer wirklich aus dem Kurs entfernen?')) {
                    console.log("remove")
                    teacherhassubject.remove().where('userid = ?',userid).save();
//                    Meteor.call('deletestudentdata',userid, function(error,result){
//                    });
            } else {
                // Do nothing!
            }
       } 
    },
    "click .back": function(event) {
        event.preventDefault();
        Router.go("faecher");
    }
});
