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
    "click .clickdelete": function(event){
        var selecteddesc = event.target.getAttribute('data-descid');
        selecteddesc = Number(selecteddesc);
        
        var selectedCompetence = Session.get('selectedCompetence'); 
        selectedCompetence = Number(selectedCompetence);
        
          descriptor.remove()
         .where("descriptorid = ?", selecteddesc)
         .save();
        
            var data= descriptor.select('pointsmax').where("competencecompetenceid = ?",selectedCompetence).fetch();
            var points = 0;
            for(var i= 0; i<data.length; i++){
                points += Number(data[i].pointsmax);
            } 
            
            competence.update({        
            pointsmax: points})
            .where("competenceid = ?", selectedCompetence)
            .save();
        
        
    },
    "click .clickrevert": function(event){
        $(event.target).parent().parent().find('.showdesc').removeClass('mode_edit');
        $(event.target).parent().parent().find('.editdesc').addClass('mode_edit');         
    },
    "click .clicksave": function(event){
        $(event.target).parent().parent().find('.showdesc').removeClass('mode_edit');
        $(event.target).parent().parent().find('.editdesc').addClass('mode_edit'); 
        
        var newdescdesc = $(event.target).parent().parent().find('.descdesc.editdesc').val();
        
        var newdescpoints = $(event.target).parent().parent().find('.descpoints.editdesc').val();
        
        var selecteddesc = event.target.getAttribute('data-descid');
        selecteddesc = Number(selecteddesc);
        
        var selectedCompetence = Session.get('selectedCompetence'); 
        selectedCompetence = Number(selectedCompetence);
        
        descriptor.update({
            descriptordesc: newdescdesc,
            pointsmax: newdescpoints})
            .where('descriptorid = ?',selecteddesc)
            .save();
        
         Meteor.call('updatedescriptor',selecteddesc,newdescdesc,newdescpoints, function(error,result){
                });
        
            var data= descriptor.select('pointsmax').where("competencecompetenceid = ?",selectedCompetence).fetch();
            var points = 0;
            for(var i= 0; i<data.length; i++){
                points += Number(data[i].pointsmax);
            } 
            
            competence.update({        
            pointsmax: points})
            .where("competenceid = ?", selectedCompetence)
            .save();
        
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
            descriptor.insert({
                competencecompetenceid: selectedCompetence,
                descriptordesc: newdescdesc,
                pointsmax: newdescpoints
            }).save();
            
            
            var data= descriptor.select('pointsmax').where("competencecompetenceid = ?",selectedCompetence).fetch();
            var points = 0;
            for(var i= 0; i<data.length; i++){
                points += Number(data[i].pointsmax);
            } 
            
            competence.update({        
            pointsmax: points})
            .where("competenceid = ?", selectedCompetence)
            .save();
            
            $('.newdescdesc').val(null);
            $('.newdescpoints').val(null);
            
            
            
//            Meteor.call('insertdescriptor',selectedCompetence,newdescdesc,newdescpoints, function(error,result){
//            if (result == true){
//              //Meteor._reload.reload();
//                console.log('inserted');
//            }
//        });
  
        }else{
            console.log("error");
        }
    }
});

//Events Delete-Competence Popup

Template.delcompetenceModalTemplate.events({
    "click .delcomp":function(){
        var selectedCompetence = Session.get('selectedCompetence');
        selectedCompetence = Number(selectedCompetence);
        var test = descriptor.select("descriptorid").where("competencecompetenceid = ?",selectedCompetence).fetch();
        for(var i =0; i < test.length; i++){
            var descid = test[i].descriptorid;
            Meteor.call('deleteallstudentdata',descid, function(error,result){
            
            });
        }
        Meteor.call('deletecompetence',selectedCompetence, function(error,result){
        if (result == true){
            Meteor._reload.reload();  
        }
        });
    }
});