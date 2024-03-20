const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  if (event) event.preventDefault();
  console.log("searching...", event);
  const searchResult = document.getElementById("search-result");
  const searchTerm = document.getElementById("search-term");
  const keyword = document.getElementById("keyword");

  const movieData = document.getElementById("movie-data");

  movieData.style.visibility = "hidden";

  searchResult.style.display = "block";

  // this is Unsafe!!!!!
  searchTerm.innerHTML = keyword.value;

  // fetching results related to the keyword value from the server
  return false;
}
