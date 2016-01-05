// Defining 2 SQL collections. The additional paramater is the postgres connection string which will only run on the server
tasks = new SQL.Collection('tasks', 'postgres://postgres:pass@localhost/meteor');
username = new SQL.Collection('username', 'postgres://postgres:pass@localhost/meteor');

subject = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');

descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');

classes = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');

subjecthasclass = new SQL.Collection('subjecthasclass', 'postgres://postgres:pass@localhost/meteor')

/*classcol = new SQL.Collection('class', 'postgres://postgres:pass@localhost/meteor');
subjectcol = new SQL.Collection('subject', 'postgres://postgres:pass@localhost/meteor');
competencecol = new SQL.Collection('competence', 'postgres://postgres:pass@localhost/meteor');
descriptor = new SQL.Collection('descriptor', 'postgres://postgres:pass@localhost/meteor');
student_has_classcol = new SQL.Collection('student_has_class', 'postgres://postgres:pass@localhost/meteor');
subject_has_classcol = new SQL.Collection('subject_has_class', 'postgres://postgres:pass@localhost/meteor');
student_has_competencecol = new SQL.Collection('student_has_competence', 'postgres://postgres:pass@localhost/meteor');
student_has_descriptorcol = new SQL.Collection('student_has_descriptor', 'postgres://postgres:pass@localhost/meteor');
teacher_has_subjectcol = new SQL.Collection('teacher_has_subject', 'postgres://postgres:pass@localhost/meteor');*/



  //tasks.createTable({text: ['$string'], checked: ["$bool", {'$default': false}], usernameid: ['$string']});
  //username.createTable({name: ['$string', '$unique']});

subject.createTable({subjectdesc: ['$string']});
subjecthasclass.createTable({classid: ['$number'], subjectid: ['$number']});

//subject.insert({subjectdesc:'all'}).save();

  //username.insert({name:'all'}).save();

  tasks.publish('tasks', function(){
    return tasks.select('id', 'text', 'checked'/*, 'username.id as usernameid', 'username.name'*/)
       //.join(['INNER JOIN'], ["usernameid"], [["username", 'id']])
       .limit(100);
  });

  username.publish('username', function(){
    return username.select('id', 'name')
                   .limit(100);
  });

    subject.publish('subject', function(){
    return subject.select('subjectid', 'subjectdesc')
                   .limit(100);
  });

descriptor.publish('descriptor', function(){
    return descriptor.select()
                   .limit(100);
  });

classes.publish('class', function(){
    return classes.select()
                   .limit(100);
  });

subjecthasclass.publish('subjecthasclass', function(){
    return subjecthasclass.select()
                   .limit(100);
  });

Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);

Accounts.onCreateUser(function(options, user) {
  user.firstName = options.firstName;
  user.lastName = options.lastName;
  user.isAdmin = false;
  return user;
});


