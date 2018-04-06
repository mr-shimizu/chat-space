$(function(){
  function buildHTML(message){
    var html =  `<div id="scroll-bottom" class="message">
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
                      <img src="${message.image}">
                    </div>
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html)
      $(".form__text").val('')
      $('.messages').animate({scrollTop: $(".messages").scrollTop()+$("#scroll-bottom").position().top}), 200, 'swing';

    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
});
