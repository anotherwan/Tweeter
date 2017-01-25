/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
   //
  //  var data = [
  //    {
  //      "user": {
  //        "name": "Newton",
  //        "avatars": {
  //          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //        },
  //        "handle": "@SirIsaac"
  //      },
  //      "content": {
  //        "text": "If I have seen further it is by standing on the shoulders of giants"
  //      },
  //      "created_at": 1461116232227
  //    },
  //    {
  //      "user": {
  //        "name": "Descartes",
  //        "avatars": {
  //          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //        },
  //        "handle": "@rd" },
  //      "content": {
  //        "text": "Je pense , donc je suis"
  //      },
  //      "created_at": 1461113959088
  //    },
  //    {
  //      "user": {
  //        "name": "Johann von Goethe",
  //        "avatars": {
  //          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //        },
  //        "handle": "@johann49"
  //      },
  //      "content": {
  //        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //      },
  //      "created_at": 1461113796368
  //    }
  //  ];

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
           <i class="fa fa-flag" aria-hidden="true"></i>
           <i class="fa fa-retweet" aria-hidden="true"></i>
           <i class="fa fa-heart" aria-hidden="true"></i>
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
  })
  loadTweets()      //loadTweets on doc.ready to show before submitting new tweet
})
