
const toggleBookmark = (span,allShowsList,setLocalStorage) => {
    span.forEach((btn) => {
       const showName = btn.parentElement.dataset.label;
       const showX = allShowsList.find(
         (show) =>
           show.title.toLowerCase().replaceAll(" ", "") ===
           showName.toLowerCase()
       );
       if (showX && showX.isBookmarked) {
         btn.classList.add("bookmarked-white");
       }

       btn.addEventListener("click", (e) => {
         const showIndex = allShowsList.findIndex(
           (show) =>
             show.title.toLowerCase().replaceAll(" ", "") ===
             showName.toLowerCase()
         );

         if (showIndex !== -1) {
           const selectedShow = allShowsList[showIndex];

           if (btn.classList.contains("bookmarked-white")) {
             btn.classList.remove("bookmarked-white");
             selectedShow.isBookmarked = false;
           } else {
             btn.classList.add("bookmarked-white");
             selectedShow.isBookmarked = true;
           }

           setLocalStorage("shows", allShowsList);
         }
       });
     });
};

export {
    toggleBookmark
}