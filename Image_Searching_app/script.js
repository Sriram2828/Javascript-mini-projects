// Unsplash api access key
const apiAccessKey = "enter your unsplash api private accesskey";

// Necessary variables
const formElements = document.querySelector("form");
const inputElements = document.getElementById("search-box");
const exploredImages = document.querySelector(".explored-images");
const showMoreBtn = document.getElementById("showMoreBtn");

let userInput = "";
let page = 1;

async function exploreImages() {
  userInput = inputElements.value;

  // Dynamic variable
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=
  ${userInput}&client_id=${apiAccessKey}`;

  // Fetching the data from the api and converting it as an json format
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  //   console.log(data); necessary data for the api about the fetched data can be accessed using this code in console
  if (page === 1) {
    exploredImages.innerHTML = "";
  }
  // Using map function we creating a new elements in the webpage
  results.map((result) => {
    const pictureContainer = document.createElement("div");
    pictureContainer.classList.add("explored-image");

    // Create image element inside the map iteration
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    // Create image handle element inside the map iteration
    const imageHandle = document.createElement("a");
    imageHandle.href = result.links.html;
    imageHandle.target = "_blank";
    imageHandle.textContent = result.alt_description;

    pictureContainer.appendChild(image);
    pictureContainer.appendChild(imageHandle);
    exploredImages.appendChild(pictureContainer);
  });

  page++;
  // If the number of page is more than one then the show more button will be visible otherwise it will be invisible
  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

// Creating an event listener for the form
formElements.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  return exploreImages();
});
// Creating an event listener for the show More Button
showMoreBtn.addEventListener("click", () => {
  exploreImages();
});
