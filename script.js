$('.search-button').on('click', function (){
  $.ajax({
    url : "http://www.omdbapi.com/?apikey=befc8159&s=" + $('.input-keyword').val(),
    success: results => {
      const movies = results.Search;
      let cards = '';
      movies.forEach( m => {
        cards += showCards(m);
      });
      $('.movie-container').html(cards);
  
      // ? Ketika tombol detail di klik
      $('.modal-detail-button').on('click', function (){
        $.ajax({
          url : "http://www.omdbapi.com/?apikey=befc8159&i=" + $(this).data('imdbid'),
          success: m => {
            const movieDetail = showMovieDetail(m);
            $('.modal-body').html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          }
  
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    }
    
  });
});



function showCards(m) {
  return `<div class="col-md-4 my-3">
            <div class="card" style="width: 18rem;">
              <img src="${m.Poster}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <p class="card-text">Check detail.</p>
                <a href="#" class="btn btn-dark modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show detail</a>
              </div>
            </div>
          </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid" alt="">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item bg-dark text-white"><h5>${m.Title} ${m.Year}</h5></li>
                  <li class="list-group-item"><strong>Director  :</strong>${m.Director}</li>
                  <li class="list-group-item"><strong>Actors  :</strong>${m.Actors}</li>
                  <li class="list-group-item"><strong>Writer  :</strong>${m.Writer}</li>
                  <li class="list-group-item"><strong>Plot  :</strong><br>${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`;
}