/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
 var div = document.createElement('div')
 div.appendChild(document.createTextNode(str))
 return div.innerHTML
}

function createTweetElement(tweet) {
 let name = tweet.user.name
 let smallAvatar = tweet.user.avatars.small
 let handle = tweet.user.handle
 let content = tweet.content.text
 let timestamp = $.timeago(tweet.created_at)
 let html =
   `<article class="tweet">
     <header class="tweet-header">
       <img src="${escape(smallAvatar)}">
         <h2 class="name">${escape(name)}</h2>
         <span class="handle">${escape(handle)}</span>
     </header>
       <div class="content">${escape(content)}</div>
       <footer class="tweet-footer">
         <span class"timestamp">${escape(timestamp)}</span>
         <span class="icons">
           <i class="fa fa-flag" aria-hidden="true"></i>&nbsp
           <i class="fa fa-retweet" aria-hidden="true"></i>&nbsp
           <i class="fa fa-heart" aria-hidden="true"></i>&nbsp
       </span>
       </footer>
    </article>`
   return html
 }

function renderTweets(data) {
  $container = $('#tweets-container')
  data.forEach(function(tweet) {
    let $tweet = createTweetElement(tweet)
    $container.prepend($tweet)
  })
}

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then((tweets) => { //change according to what's passed/received in data
    $('#tweets-container').empty()  //empty container so that db doesn't duplicate when form is submitted
    renderTweets(tweets)
  })
}

$(function() {
  $('#tweet-form').on('submit', function(ev) {
    ev.preventDefault();  //default is synchronous; we are preventing default to make it asynch using AJAX
    if ($('#inputText').val().length > 140) {
      alert('Character count is over the limit!')
    } else if ($('#inputText').val().length === 0 || $('#inputText').val() === "") {
      alert('Tweet field is empty!')
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()   //returns "text=string"
      })
      .done(function() {
        $('#inputText').val("")
        $('.counter').text(140)
        loadTweets()      //reminder to loadTweets after submit
      })
      .fail(function(error) {
        console.log('Error: ', error)
      })
    }
  });

  $('#login-form').on('submit', function(ev) {
    ev.preventDefault()
    $.ajax('/login', {
      method: 'POST',
      data: $(this).serialize()
    })
    .done(function(data) {
      $('.login').slideToggle()
      $('#login-button').hide()
      $('#registration-button').hide()
      $('#welcome-user').text(data.email)
    })
    .fail(function(error) {
      console.log('Error: ', error)
    })
  })

  $('#logout-button').on('click', function(ev) {
    ev.preventDefault()
    $.ajax('/logout', {
      method: 'GET',
    })
    .done(function() {
      $('#welcome-user').hide()
      $('#logout-button').hide()
    })
  })

    // $('#reg-form').on('submit', function(ev) {
    //   ev.preventDefault();
    //   $.ajax('/tweets', {
    //     method: 'POST',
    //     data: $(this).serialize()   //returns "text=string"
    //   })

  loadTweets()      //loadTweets on doc.ready to show before submitting new tweet
})
