Template.adminfaecherdetail.helpers({
    allteachers: function () {
      return Meteor.users.find({'usertype' : 'teacher'});
    },
    subjectteachers: function(){
        return this[0];
    },
    subjectinfo: function(){
        return this[1];
    },
    years: function(){
        return years.select().fetch();
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
    },
    "click .safedesc":function(event) {
        var subdesc = $('.subdesc').val();
        var subyear = $('.subyear option:selected').attr('data-yearsid');
        var selectedsub = Session.get('selectedSubject');
        subyear = Number(subyear);
        selectedsub = Number(selectedsub);
        
        console.log(subdesc,subyear);
        
        subject.update({
              subjectdesc: subdesc, 
              yearsyearsid: subyear
            })
            .where("subjectid = ?", selectedsub)
            .save();
        
                 Meteor.call('updatesubject',subdesc,subyear,selectedsub, function(error,result){
                });
  
    }
});
