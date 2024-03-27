import { fetchData, url } from "./js/fetchShows.js";
import {displayShows,activeNav} from "./js/displayShows.js";
import {
  getItemsFromStorage,
  setItemsToStorage,
} from "./js/setLocalStorage.js";
import { toggleBookmark } from "./js/utils.js";

const seriesContainer = document.querySelector(".content-section");
const searchHeading = document.querySelector(".search-text");
const search = document.getElementById("search");
const allShowsList = getItemsFromStorage("shows");

const filterShow = (list, genre) => {
  const shows = list.filter((show) => show.category === genre);
  return shows;
};

const displaySeries = (data) => {
  const series = filterShow(data, "TV Series");

  seriesContainer.innerHTML = displayShows(series);
  const bookmarked = document.querySelectorAll(".bookmarked ");
  // add item to bookmark or remove item from bookmark
  toggleBookmark(bookmarked, allShowsList, setItemsToStorage);
};

search.addEventListener("input", (e) => {
  let value = e.target.value;
  value.toLowerCase().trim();

  const filtered = allShowsList.filter(
    (show) =>
      show.title.toLowerCase().trim().includes(value) &&
      show.category === "TV Series"
  );
  if (filtered) {
    seriesContainer.innerHTML = displayShows(filtered);
    searchHeading.textContent = `Found ${filtered.length} results for '${value}'`;
  }
  if (value === "") {
    searchHeading.textContent = "Series";
  }
});

activeNav(2)

const displayAll = async () => {
  const data = await fetchData(url);
  displaySeries(data);
 
};

displayAll();


