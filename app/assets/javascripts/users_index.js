$(function(){
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      if (users.length !== 0) {
       users.forEach(function(user){
       });
     }
      // usersは配列オブジェクト,中にはハッシュオブジェクト[{id: , name:}, {id: , name:}, {id: , name:}]。ただし、usersからuserを取り出した後はuser.id, user.nameで出来る。
    })
  });
});
