/* Give me the first page of movies from TMDb version 3, sorted by popular in descending order(Highest to low). Here is  my API key so I am allowed to ask for the page 1 movies.
*/
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

/* Javascripy constant name IMG_PATH is the base part of a URL used to load movie images (like posters or backgrounds) from TMDb at 1280px width.*/
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

/*Javascript constant SEARCH_API. I use the API key for authentication.  &query=" Starts the search keyword parameter (which I will  add later like movie name   */
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

/*(DOM Manipulation) I am using document.getElementById() to select HTML elements by their id attribute and store them in variables(main,form, search). */
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
/*This line calls the function named getMovies and gives it a variable called API_URL, which holds the TMDb API address. */
getMovies(API_URL)

/*This defines an async function, which means it can use the await keyword inside it to wait for promises (like API calls). */
async function getMovies(url) {

    /*This line sends an HTTP request to the URL (the API), and waits for the response. fetch(url) makes a web request, await pauses until the request finishes, res(response) stores the response object. The below three lines help in fetch aAPI. */
    const res = await fetch(url)

    /*This line converts the raw response (res) into JSON format (JavaScript object), which makes it usable. */
    const data = await res.json()

    /*This line calls another function to display the list of movies on the web page. */
    showMovies(data.results)
}
/* In short all the below code do: When the form is submitted, don’t let the browser reload automatically. Instead, get what the user typed. If it’s non-empty, fetch movies matching that term and then clear the input box. If they submitted an empty search, just reload the page to show the default movie list.” */

/*Defines a function called showMovies that takes a list of movies (from the API). */
function showMovies(movies) {
    main.innerHTML = ''

    /*loops each movie in the list */
    movies.forEach((movie) => {

        /*title:movie name, poster_path:image path for the movie poster, vote_average: movie rating, overview: short summary of the movie */
        const { title, poster_path, vote_average, overview } = movie

        /*Creates a new <div> element in memory for each movie. */
        const movieEl = document.createElement('div')

        /*Adds the class movie to the new <div> so I can style it with CSS. */
        movieEl.classList.add('movie')

        /*Fills the new <div> with HTML showing:Movie poster image, Title and rating, Movie overview. This line uses template literals (`...`) to insert values into the HTML. */
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        /*Adds the newly created and filled movie element to the <main> section on my page. */
        main.appendChild(movieEl)
    })
}

/*Another function that returns a CSS class name (like 'green', 'orange', 'red') based on how high the vote_average is. */
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5.5) {
        return 'orange'
    } else {
        return 'red'
    }
}

/*Listen for the form’s "submit" event (i.e. when the user submits the form). e is the event object. */
form.addEventListener('submit', (e) => {
    /*Stop the browser from doing its default “submit” behavior (which would reload the page). */
    e.preventDefault()

    /*Grab whatever text the user typed into my <input id="search"> and store it in the variable searchTerm. */
    const searchTerm = search.value

    /*Make sure there is actually some text (it’s not null, undefined, or the empty string). */
    if (searchTerm && searchTerm !== '') {

        /*If there is a search term, call your getMovies() function, passing in the search URL plus the user’s query. This kicks off a new API request to fetch matching movies. */
        getMovies(SEARCH_API + searchTerm)

        /*Clear the search input so it’s ready for a fresh query. */
        search.value = ''

        /*If the user didn’t type anything and just hit “Submit,” reload the page to reset everything. */
    } else {
        window.location.reload()
    }
})
