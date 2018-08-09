const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getYoutubeApiData ( searchTerm, callBack, stamp) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyAIW5KHhF-n0yUxO6BiNTjqh19hlPSs4vk',
    q: searchTerm,
    pageStamp: stamp,
    type: 'video'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callBack);
}

function renderResults (data) {
  let results = '';
  const userInput = $('.search-form').find('.userInput').val();

  if ( data.items.length !== 0) {
    data.items.forEach(function(item) {
      results += '<p>' + item.snippet.title +
        '<a class="video" href="https://www.youtube.com/embed/' + 
        item.id.videoId + '">' +
        '<img src="' + item.snippet.thumbnails.medium.url + '"></a><br></p>';
   })
  }
  $('.results').html(results);
}

function submitListener() {
  $('.search-form').submit(function(event) {
    event.preventDefault();
    var query = $(this).find('.userInput').val();
    getYoutubeApiData(query, renderResults);
  })
}

$(function() {
  submitListener();

})
