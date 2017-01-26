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
 let timestamp = tweet.created_at
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
  .then((tweets) => {
    $('#tweets-container').empty()  //empty container so that db doesn't duplicate when form is submitted
    renderTweets(tweets)
  })
}

$(function() {
  $('form').on('submit', function(ev) {
    ev.preventDefault();  //default is synchronous; we are preventing default to make it asynch using AJAX
    console.log()
    if ($('#inputText').val().length > 140) {
      alert('Character count is over the limit!')
    } else if ($('#inputText').val().length === 0 || $('#textInput').val() === "") {
      alert('Tweet field is empty!')
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()   //returns "text=string"
      })
      .then(function() {
        loadTweets()      //reminder to loadTweets after submit
      })
      .fail(function(error) {
        console.log('Error: ', error)
      })
    }
  })
  loadTweets()      //loadTweets on doc.ready to show before submitting new tweet
  $('#compose-button').click(function() {
    $('.new-tweet').slideToggle()
    $('#inputText').focus()
  })
})
