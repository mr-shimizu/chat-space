$(document).on('turbolinks:load', function() {
  let SECOND = 2000
  let messagesDiv = $('.messages')

  function buildHTML(message){
    let imageHtml = ((message.image)
      ? (`<img src="${message.image}"/>`)
      : ("")
    );
    let html =  `<div class= "message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__text">
                      ${message.content}<br>
                      ${imageHtml}
                    </div>
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      messagesDiv.append(html);
      $(".form__text").val('');
      $(".image-button__image").val('');
      messagesDiv.animate({scrollTop: messagesDiv.scrollTop()+$('.message').last().position().top}), 200, 'swing';
    })
    .fail(function(){
      alert('メッセージまたは画像を投稿してください。');
    })
    return false;
  });

  let interval = setInterval(function() {
    let latestId = $('.message').last().data("messageId");
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href,
      data: { latest_id: latestId },
      dataType: 'json',
    })
    .done(function(data) {
      let insertHTML = "";
      data.messages.forEach(function(message){
        insertHTML += buildHTML(message);
      });
      messagesDiv.append(insertHTML);
      messagesDiv.animate({scrollTop: messagesDiv.scrollTop()+$('.message').last().position().top}), 200, 'swing';
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
  }}, SECOND);
});
