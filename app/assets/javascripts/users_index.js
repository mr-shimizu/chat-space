$(function(){
  var user_list = $('#user-search-result')
  var user_field = $("#user-search-field")
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    user_list.append(html);
  }

  user_field.on("keyup", function(){
    var input = user_field.val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      user_list.empty();
      if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
  });
});
