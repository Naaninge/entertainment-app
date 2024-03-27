import { fetchData, url } from "./js/fetchShows.js";
import { displayShows, activeNav } from "./js/displayShows.js";
import {
  getItemsFromStorage,
  setItemsToStorage,
} from "./js/setLocalStorage.js";

const seriesContainer = document.querySelector(".series-cont");
const moviesContainer = document.querySelector(".movie-cont");
const search = document.getElementById("search");
const searchHeading = document.querySelector(".search-text");

// get items
const allShowsList = getItemsFromStorage("shows");

// filter shows to genre and if they are bookmarked
const filterShow = (list, genre) => {
  const shows = list.filter(
    (show) => show.category === genre && show.isBookmarked === true
  );
  return shows;
};
//

const displayBookmarked = (data) => {
  // filter shows list to only tv series
  const seriesList = filterShow(data, "TV Series");
  // filter shows list to only movies
  const moviesList = filterShow(data, "Movie");

  // display series list  in dom
  seriesContainer.innerHTML = displayShows(seriesList);
  // display movies list in dom
  moviesContainer.innerHTML = displayShows(moviesList);

  const bookmarked = document.querySelectorAll(".bookmarked ");

  bookmarked.forEach((btn) => {
    const showName = btn.parentElement.dataset.label;
   
      btn.classList.add("bookmarked-white");
    

    btn.addEventListener("click", (e) => {
      const ShowIndex = allShowsList.findIndex(
        (show) =>
          show.title.toLowerCase().replaceAll(" ", "") ===
          showName.toLowerCase(getItemsFromStorage("shows"))
      );

      if (ShowIndex !== -1) {
        const selectedShow = allShowsList[ShowIndex];

        if (btn.classList.contains("bookmarked-white")) {
          btn.classList.remove("bookmarked-white");
          selectedShow.isBookmarked = false;
        
        } else {
          btn.classList.add("bookmarked-white");
          selectedShow.isBookmarked = true;
        }

        setItemsToStorage("shows",allShowsList);
        displayBookmarked(getItemsFromStorage("shows"));
      }
    });
  });

  
};

search.addEventListener("input", (e) => {
  let value = e.target.value;
  value.toLowerCase().trim();

  const filtered = allShowsList.filter(
    (show) =>
      show.title.toLowerCase().trim().includes(value) &&
      show.isBookmarked === true
  );
  if (filtered) {
    moviesContainer.innerHTML = displayShows(filtered);
    searchHeading.textContent = `Found ${filtered.length} results for '${value}'`;
  }
  if (value === "") {
    searchHeading.textContent = "Bookmarked Movies";
  }
});

activeNav(3);



displayBookmarked(allShowsList);


