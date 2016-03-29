Template.teachertable.events({
    "click .kompedit": function(event) {
        event.preventDefault();
        $('.kompstatemode').addClass("hide");
        $('.kompeditmode').removeClass("hide");
    },
    "click .kompsafe": function(event) {
        event.preventDefault();
        $('.kompeditmode').addClass("hide");
        $('.kompstatemode').removeClass("hide");
    },
    "click .editcomp": function(event) {
        event.preventDefault();

        var selectedcomp = event.target.getAttribute('data-compid')
        Session.set('selectedCompetence', selectedcomp);
        
        
        $('#competenceModal').modal('show');
    },
    "click .newcomp": function(event) {
        event.preventDefault();
        
        var selectedSubject = Session.get('selectedSubject');
        selectedSubject = Number(selectedSubject);
        
        var pointsmaxVar= 0;
        
        Meteor.call('insertcompetence',selectedSubject,pointsmaxVar, function(error,result){
            if (result == true){
              Meteor._reload.reload(); 
            }
        });
        
    },
    "click .pluspoints": function(event){
        event.preventDefault();
        var studhasdescid = event.target.getAttribute('data-studhasdescid');
        studhasdescid = Number(studhasdescid);
        var pointsvalue = $(event.target).parent().find('.pointsval').val();
        var pointsmax = $(event.target).parent().find('.pointsmax').text();
        pointsvalue = Number(pointsvalue);
        pointsmax = Number(pointsmax);
        
        pointsvalue+=1;
        
        if(studhasdescid == 0){
            var userid = event.target.getAttribute('data-userid');
            var descid = event.target.getAttribute('data-descid');
            descid = Number(descid);
            studenthasdescriptor.insert({
                descriptordescriptorid: descid,
                userid: userid,
                pointsreached: pointsvalue
            }).save();
            Meteor._reload.reload(); 
        }else{
            if(pointsvalue-1 < pointsmax){
            studenthasdescriptor.update({
            pointsreached: pointsvalue
            }).where("studenthasdescriptorid = ?",studhasdescid).save();
            }
        }    
    },
    "click .minuspoints": function(event){
        event.preventDefault();
        var studhasdescid = event.target.getAttribute('data-studhasdescid');
        studhasdescid = Number(studhasdescid);
        var pointsvalue = $(event.target).parent().find('.pointsval').val();
        pointsvalue = Number(pointsvalue);
        
        if(pointsvalue == 0){
            console.log("standart");
        }else{
            pointsvalue-=1;
            studenthasdescriptor.update({
            pointsreached: pointsvalue
            }).where("studenthasdescriptorid = ?",studhasdescid).save();
        }    
    },
    "change .pointsval":function(event){
        event.preventDefault();
        var studhasdescid = event.target.getAttribute('data-studhasdescid');
        studhasdescid = Number(studhasdescid);
        var pointsvalue = $(event.target).parent().find('.pointsval').val();
        pointsvalue = Number(pointsvalue);
        
        if(!pointsvalue == ""){
            if(studhasdescid == 0){
                var userid = event.target.getAttribute('data-userid');
                var descid = event.target.getAttribute('data-descid');
                descid = Number(descid);
                studenthasdescriptor.insert({
                descriptordescriptorid: descid,
                userid: userid,
                pointsreached: pointsvalue
                }).save();
                Meteor._reload.reload(); 
            }else{
                console.log("ja",pointsvalue)
                pointsvalue = Number(pointsvalue);
                studenthasdescriptor.update({
                pointsreached: pointsvalue
                }).where("studenthasdescriptorid = ?",studhasdescid).save();
            }
        }
    },
    "click .abgaben":function(event){
        var descdesc = event.target.getAttribute('data-descname');
        var descid = event.target.getAttribute('data-descid');
        descid= Number(descid);
        var userid = event.target.getAttribute('data-userid');
        Session.set('selectedDescId',descid);
        Session.set('selectedDescName',descdesc);
        Session.set('userid',userid);
        $('#useruploads').modal('show');
    }
});


Template.teachertable.helpers({
    competences: function () {
      return this[0];
    },
    dataset: function(){
        return this[1];
    }
});
