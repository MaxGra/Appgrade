// Defining SQL collections. The additional paramater is the postgres connection string which will only run on the server

years = new SQL.Collection('years', 'postgres://postgres:pass@localhost/meteor');

subject = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');

competence = new SQL.Collection('competence', 'postgres://postgres:pass@localhost/meteor');

descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');

classes = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');

teacherhassubject = new SQL.Collection('teacherhassubject', 'postgres://postgres:pass@localhost/meteor');

studenthasclass = new SQL.Collection('studenthasclass', 'postgres://postgres:pass@localhost/meteor');

studenthascompetence = new SQL.Collection('studenthascompetence', 'postgres://postgres:pass@localhost/meteor');

studenthasdescriptor = new SQL.Collection('studenthasdescriptor', 'postgres://postgres:pass@localhost/meteor');
//_______________________________________________

    var yearsTable = {
        yearsid: ['$number'],
        yearsdesc: ['$string', '$notnull']
    };

    var subjectTable = {
        subjectid: ['$number'],
        yearsyearid: ['$number'],
        subjectdesc: ['$string', '$notnull']
    };

    var competenceTable = {
        competenceid: ['$number'],
        subjectsubjectid: ['$number'],
        competencedesc: ['$string', '$notnull'],
        pointsmax: ['$number']
    };

    var descriptorTable = {
        descriptorid: ['$number'],
        competencecompetenceid: ['$number'],
        descriptordesc: ['$string', '$notnull'],
        pointsmax: ['$number']
    };

    var classTable = {
        classid: ['$number'],
        yearsyearid: ['$number'],
        classdesc: ['$string', '$notnull']
    };

    var teacherhassubjectTable = {
        teacherhassubjectid: ['$number'],
        subjectid: ['$number'],
        userid: ['$string', '$notnull']
    };

//    var studenthasclassTable = {
//        studenthasclassid: ['$number'],
//        classclassid: ['$number'],
//        userid: ['$string', '$notnull']
//    };
//
//    var studenthascompetenceTable = {
//        studenthascompetenceid: ['$number'],
//        competencecompetenceid: ['$number'],
//        userid: ['$string', '$notnull'],
//        pointserached: ['$number']
//    };
//
//    var studenthasdescriptorTable = {
//        studenthasdescriptorid: ['$number'],
//        descriptordescriptorid: ['$number'],
//        userid: ['$string', '$notnull'],
//        pointserached: ['$number']
//    };

//_______________________________________________


    years.createTable(yearsTable);

    subject.createTable(subjectTable);

    competence.createTable(competenceTable);

    descriptor.createTable(descriptorTable);

    classes.createTable(classTable);

    teacherhassubject.createTable(teacherhassubjectTable);

//    studenthasclass.createTable(studenthasclassTable);
//
//    studenthascompetence.createTable(studenthascompetenceTable);
//
//    studenthasdescriptor.createTable(studenthasdescriptorTable);



//_______________________________________________



  Template.test.helpers({
    usernames: function () {
      return username.select().fetch();
    },
      subjects: function() {
          return subject.select().fetch();
    } /*,
    tasks: function () {
      if (newUser === 'all'){
          return tasks.select('tasks.id', 'tasks.text', 'tasks.checked', 'tasks.created_at', 'username.name')
            .join(['OUTER JOIN'], ['usernameid'], [['username', ['id']]])
            .fetch();
      }
      else {
        return tasks.select('id', 'text', 'checked', 'username.name')
          //.join(['OUTER JOIN'], ['usernameid'], [['username', ['id']]])
         // .where("name = ?", newUser)
          .fetch();
      }
    }*/
  });


  Template.test.events({
    "submit .new-task": function (event) {
      if (event.target.category.value){
        var user = username.select()
                     .where("name = ?", event.target.category.value)
                     .fetch();
        user = user[0].id;
        var text = event.target.text.value;
        tasks.insert({
          text:text,
          checked:false,
          usernameid: user
        }).save();
        event.target.text.value = "";
      } else{
        alert("please add a user first");
      }
      return false;
    },
    "submit .new-user": function (event) {
      var text = event.target.text.value;
      username.insert({
        name:text
      }).save();
      event.target.text.value = "";

      return false;
    },
    "click .toggle-checked": function () {
      tasks.update({id: this.id, "checked": !this.checked})
           .where("id = ?", this.id)
           .save();
    },
    "click .delete": function () {
      tasks.remove()
           .where("id = ?", this.id)
           .save();
    },
    "change .catselect": function(event){
      newUser = event.target.value;
      tasks.reactiveData.changed();
    }
  });


