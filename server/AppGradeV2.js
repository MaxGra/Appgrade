// Defining 2 SQL collections. The additional paramater is the postgres connection string which will only run on the server
tasks = new SQL.Collection('tasks', 'postgres://postgres:pass@localhost/meteor');
username = new SQL.Collection('username', 'postgres://postgres:pass@localhost/meteor');



  //tasks.createTable({text: ['$string'], checked: ["$bool", {'$default': false}], usernameid: ['$string']});
  //username.createTable({name: ['$string', '$unique']});

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
