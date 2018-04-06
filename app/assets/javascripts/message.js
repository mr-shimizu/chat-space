$(function(){
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
