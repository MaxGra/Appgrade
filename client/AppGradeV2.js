// Defining 2 SQL collections. The additional paramater is the postgres connection string which will only run on the server
tasks = new SQL.Collection('tasks', 'postgres://postgres:pass@localhost/meteor');
username = new SQL.Collection('username', 'postgres://postgres:pass@localhost/meteor');

/*classcol = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');
subjectcol = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');
competencecol = new SQL.Collection('competence', 'postgres://postgres:pass@localhost/meteor');*/
descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');
/*student_has_classcol = new SQL.Collection('student_has_class', 'postgres://postgres:pass@localhost/meteor');
subject_has_classcol = new SQL.Collection('subject_has_class', 'postgres://postgres:pass@localhost/meteor');
student_has_competencecol = new SQL.Collection('student_has_competence', 'postgres://postgres:pass@localhost/meteor');
student_has_descriptorcol = new SQL.Collection('student_has_descriptor', 'postgres://postgres:pass@localhost/meteor');
teacher_has_subjectcol = new SQL.Collection('teacher_has_subject', 'postgres://postgres:pass@localhost/meteor');*/



  var newUser = '';
    
  var taskTable = {
    id: ['$number'],
    text: ['$string', '$notnull'],
    checked: ['$bool'],
    usernameid: ['$number']
  };

  var usersTable = {
    id: ['$number'],
    name: ['$string', '$notnull']
  };

/*
    var classTable = {
        class_id: ['$number'],
        classdesc: ['$string']
    };

    var subjectTable = {
        subject_id: ['$number'],
        subjectdesc: ['$string']
    };

    var competenceTable = {
        competence_id: ['$number'],
        subject_id: ['$number'],
        competencedesc: ['$string', '$notnull'],
        pointsmax: ['$number']
    };
    */

    var descriptorTable = {
        descriptor_id: ['$number', '$notnull'],
        competence_competence_id: ['$number', '$notnull'],
        descriptordesc: ['$string'],
        pointsmax: ['$number']
    };
/*
    var student_has_classTable = {
        student_has_class_id: ['$number'],
        class_id: ['$number'],
        user_id: ['$number']
    };

    var subject_has_classTable = {
        class_id: ['$number'],
        subject_id: ['$number']
    };

    var student_has_competenceTable = {
        student_has_competence_id: ['$number'],
        competence_id: ['$number'],
        user_id: ['$number'],
        pointsreached: ['$number']
    };

    var student_has_descriptorTable = {
        student_has_descriptor_id: ['$number'],
        descriptor_id: ['$number'],
        user_id: ['$number'],
        pointsreached: ['$number']
    };

    var teacher_has_subjectTable = {
        teacher_has_subject_id: ['$number'],
        subject_id: ['$number'],
        user_id: ['$number']
    };
    */


    


  tasks.createTable(taskTable);
  username.createTable(usersTable);

   /* classcol.createTable(classTable);
    subjectcol.createTable(subjectTable);
    competencecol.createTable(competenceTable);*/
    descriptor.createTable(descriptorTable);
    /*student_has_classcol.createTable(student_has_classTable);
    subject_has_classcol.createTable(subject_has_classTable);
    student_has_competencecol.createTable(student_has_competenceTable);
    student_has_descriptorcol.createTable(student_has_descriptorTable);
    teacher_has_subjectcol.createTable(teacher_has_subjectTable);*/
    


  Template.test.helpers({
    usernames: function () {
      return username.select().fetch();
    },
      descriptors: function() {
          return descriptor.select().fetch();
      },
    tasks: function () {
      if (newUser === 'all'){
          return tasks.select('tasks.id', 'tasks.text', 'tasks.checked', 'tasks.created_at', 'username.name')
            .join(['OUTER JOIN'], ['usernameid'], [['username', ['id']]])
            .fetch();
      }
      else {
        return tasks.select('id', 'text', 'checked'/*, 'username.name'*/)
          //.join(['OUTER JOIN'], ['usernameid'], [['username', ['id']]])
         // .where("name = ?", newUser)
          .fetch();
      }
    }
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


