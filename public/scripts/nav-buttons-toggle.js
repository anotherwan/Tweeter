$(function() {
  $('#compose-button').click(function() {
    $('.new-tweet').slideToggle()
    $('#inputText').focus()
  })

  $('#registration-button').click(function() {
    $('.registration').slideToggle()
    $('#reg-name').focus()
  })

  $('#login-button').click(function() {
    $('.login').slideToggle()
    $('#login-email').focus()
  })
})
