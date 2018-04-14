$(document).on("turbolinks:load", function(){
  let userList = $('#user-search-result');
  let userField = $("#user-search-field");
  let groupUserList = $('#chat-group-users');

  function appendUser(user){
    let userHtml = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    userList.append(userHtml);
  };

  function appendGroupUser(user){
    let groupUserHtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    groupUserList.append(groupUserHtml);
  };

  userField.on("keyup", function(){
    let input = userField.val();
    if (input.length === 0) {
      userList.empty();
      return false;
    };
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      userList.empty();
      users.forEach(function(user){
      appendUser(user);
     });
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  userList.on("click", '.chat-group-user__btn--add', function(){
    user = {};
    user.id = $(this).data('user-id');
    user.name = $(this).data('user-name');
    $(this).parent().remove();
    appendGroupUser(user);
  });

  groupUserList.on("click", '.js-remove-btn', function(){
    $(this).parent().remove();
  });
});
