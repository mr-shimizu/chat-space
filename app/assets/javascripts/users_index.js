$(document).on("turbolinks:load", function(){
  var user_list = $('#user-search-result');
  var user_field = $("#user-search-field");
  var group_user_list = $('#chat-group-users');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    user_list.append(html);
  };

  function appendGroupUser(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    group_user_list.append(html);
  };

  user_field.on("keyup", function(){
    var input = user_field.val();
    if (input.length === 0) {
      user_list.empty();
      return false;
    };
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      user_list.empty();
      users.forEach(function(user){
      appendUser(user);
     });
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  user_list.on("click", '.chat-group-user__btn--add', function(){
    user = {};
    user.id = $(this).data('user-id');
    user.name = $(this).data('user-name');
    $(this).parent().remove();
    appendGroupUser(user);
  });

  group_user_list.on("click", '.js-remove-btn', function(){
    $(this).parent().remove();
  });
});
