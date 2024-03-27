const url = "./data.json";
// starter-code\data.json
const loadingDiv = document.querySelector(".loading-div")

const fetchData = async (url) => {
  loadingDiv.classList.remove("hide")
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    loadingDiv.classList.add("hide");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchData, url };
