  Template.post.helpers({
    myHelper: function(){
      return Session.get('loadid'); // "bar"
    },
//    competences: function() {
//        var currentid = this._id;
//        console.log(currentid);
//      return competence.select().where("subjectsubjectid= ?", currentid).fetch();
//   }
      competences: function() {
          console.log(this);
        return this;
   }
  });