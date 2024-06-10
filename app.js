import { fetchData, url } from "./js/fetchShows.js";
import { displayShows, getIcon, activeNav } from "./js/displayShows.js";
import {
  getItemsFromStorage,
  setItemsToStorage,
} from "./js/setLocalStorage.js";
import { toggleBookmark } from "./js/utils.js";

const trendingCont = document.querySelector(".trending-images");
const recommendedCont = document.querySelector(".recommended-section");
const searchHeading = document.querySelector(".search-text");
const search = document.getElementById("search");
const nav = document.querySelector("nav.trends");

const displayAll = async () => {
  const data = await fetchData(url);
  setItemsToStorage("shows", data);
  return data; // Return the data to use it after fetching
};

const filterShow = (list) => {
  const shows = list.filter((show) => show.isTrending === true);
  return shows;
};

const displayTrending = (data) => {
  const trendingMovies = filterShow(data);
  trendingCont.innerHTML = trendingMovies
    .map((movie) => {
      const {
        title,
        category,
        rating,
        thumbnail: {
          regular: { large: img },
        },
        year,
      } = movie;

      return `
          <div class="trending-img-div " data-label=${title.replace(" ", "")}>
              <span class="bookmarked">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    stroke-width="1.5"
                    fill="none"
                  /></svg>
              </span>
              <div class="image-cont">
                <img
                  src=${img}
                  alt=${title}
                  class="rec-img"
                />
                <div class="play-container">
                  <button class="play-btn">
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF"/>
                    </svg>
                    <span>Play</span>
                  </button>
                </div>
              </div>
              <div class="movie-info">
                <span class="meta-info">
                  <p class="year">${year}</p>
                  &#183;
                  <p class="genre">${getIcon(category)}</p>
                  <p>${category}</p>
                  &#183;
                  <p class="pg">${rating}</p>
                </span>
                <h4>${title}</h4>
              </div>
          </div>
        `;
    })
    .join("");

  const bookmarked = document.querySelectorAll(".bookmarked");
  toggleBookmark(bookmarked, data, setItemsToStorage);
};

const displayRecommended = (data) => {
  recommendedCont.innerHTML = displayShows(data);
  const bookmarked = document.querySelectorAll(".bookmarked");
  toggleBookmark(bookmarked, data, setItemsToStorage);
};

const init = async () => {
  const allShowsList = await displayAll(); // Wait for the data to be fetched and stored

  // Event listener for search
  search.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase().trim();

    const filtered = allShowsList.filter(
      (show) =>
        show.title.toLowerCase().trim().includes(value) &&
        show.category === "Movie"
    );

    if (filtered.length > 0) {
      trendingCont.innerHTML = displayShows(filtered);
      searchHeading.textContent = `Found ${filtered.length} results for '${value}'`;
    } else {
      searchHeading.textContent = "Trending";
    }
  });

  // Initial display calls
  displayTrending(allShowsList);
  displayRecommended(allShowsList);
  activeNav(0);
};

window.addEventListener("DOMContentLoaded", init);
