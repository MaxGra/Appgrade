//Helpers Competence Popup

Template.competenceModalTemplate.helpers({
  competences: function() {
        var selectedCompetence = Session.get('selectedCompetence');
        selectedCompetence = Number(selectedCompetence);
        var competencedata = competence.select().where('competenceid= ?', selectedCompetence).fetch();
        return competencedata;
    },
    descriptors: function(){
        var selectedCompetence = Session.get('selectedCompetence'); 
        selectedCompetence = Number(selectedCompetence);
        var descriptordata = descriptor.select().where('competencecompetenceid= ?', selectedCompetence).fetch();
        return descriptordata;
    }
});

//Events Competence Popup

Template.competenceModalTemplate.events({
    "click .clickedit": function(event) {
        $(event.target).parent().parent().find('.showdesc').addClass('mode_edit');
        $(event.target).parent().parent().find('.editdesc').removeClass('mode_edit');
    },
    "click .clicksave": function(event){
        $(event.target).parent().parent().find('.showdesc').removeClass('mode_edit');
        $(event.target).parent().parent().find('.editdesc').addClass('mode_edit'); 
    },
    "click .saveall": function(event){
        var selectedCompetence = Session.get('selectedCompetence');
        selectedCompetence = Number(selectedCompetence);
        var desc = $('.compdescnew').val();
        var points = $('.comppointsnew').val();
        points = Number(points);
        
        competence.update({        
            competencedesc: desc,
            pointsmax: points})
            .where("competenceid = ?", selectedCompetence)
            .save();
        
        Meteor.call('updatecompetence',selectedCompetence,desc,points, function(error,result){
                });
        
        
        console.log(selectedCompetence,desc,points);
    },
    "click .delall": function(event){
        $('#delcompetenceModal').modal('show');
    },
    "click .createnewdesc": function(event){
        var selectedCompetence = Session.get('selectedCompetence');
        selectedCompetence = Number(selectedCompetence);
        var newdescdesc = $('.newdescdesc').val();
        var newdescpoints = $('.newdescpoints').val();
        newdescpoints = Number(newdescpoints);
        
        if(newdescdesc.replace(/\s/g,'') !== "" && newdescpoints !== 0 && newdescpoints !== null){
            console.log(newdescdesc,newdescpoints);
            descriptor.insert({
                competencecompetenceid: selectedCompetence,
                descriptordesc: newdescdesc,
                pointsmax: newdescpoints
            }).save();
            
        }else{
            console.log("error");
        }
    }
});

//Events Delete-Competence Popup

Template.delcompetenceModalTemplate.events({
    "click .delcomp":function(){
        console.log('del');
        var selectedCompetence = Session.get('selectedCompetence');
        selectedCompetence = Number(selectedCompetence);
        Meteor.call('deletecompetence',selectedCompetence, function(error,result){
            if (result == true){
              Meteor._reload.reload();  
            }
        });
    }
});