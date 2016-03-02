Template.competenceModalTemplate.helpers({
  competences: function() {
    var selectedCompetence = Session.get('selectedCompetence');
      var descriptordata = descriptor.select().where('competencecompetenceid= ?', selectedCompetence).fetch();
      return descriptordata;
    
//    if (typeof animalId !== "undefined") {
//      var animal = Animals.findOne(animalId);
//      return animal;
//    } else {
//      return {name:'', rank:''}
//    }
  }
});