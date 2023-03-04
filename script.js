"use strict";

// Variables
const input = document.createElement("input");
const div = document.createElement("div");
let color;

const myLibrary = [];

// Constants
const STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  HIATUS: "hiatus",
  COMPLETED: "completed",
};

// Define Resource constructor function
function Resource(
  resource,
  category,
  status,
  progress,
  startDate,
  finishDate,
  notes,
  rating
) {
  this.resource = resource;
  this.category = category;
  this.status = status || STATUS.PENDING;
  this.progress = progress || 0;
  this.startDate = startDate || "";
  this.finishDate = finishDate || "";
  this.notes = notes || "";
  this.rating = rating || 0;

  // Method to update resource status
  this.updateStatus = function (newStatus) {
    if (Object.values(STATUS).includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  };

  // Method to handle changes to resource rating
  this.handleRatingChange = function (event) {
    const newRating = parseInt(event.target.value);
    if (isNaN(newRating) || newRating < 1 || newRating > 10) {
      throw new Error("Invalid rating");
    }
    this.rating = newRating;
  };

  // Method to get rating input element
  this.getRatingInput = function () {
    if (this.rating >= 7) {
      color = "green";
    } else if (this.rating >= 2) {
      color = "blue";
    } else {
      color = "yellow";
    }
    div.classList.add("rating-bar");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "10");
    input.setAttribute("step", "1");
    input.value = this.rating;
    input.addEventListener("change", this.handleRatingChange);
    input.style.backgroundColor = color;
    div.appendChild(input);
    return div;
  };
}

// Define example resource object
const exampleResource = new Resource(
  "Example Resource",
  "Online Courses",
  STATUS.IN_PROGRESS,
  50,
  "2022-01-01",
  "",
  "Some notes",
  8
);

// Add the example to lib array
myLibrary.push(exampleResource);

// Submit Form Logic
const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector(".resource-form");

function submissionForm() {
  submitBtn.addEventListener("click", () => {
    const resource = document.getElementById("text-input").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;
    const progress = document.getElementById("progress").value;
    const startDate = document.getElementById("start-date-input").value;
    const finishDate = document.getElementById("end-date-input").value;
    const notes = document.getElementById("notes-input").value;
    const rating = document.getElementById("rating-input").value;

    const newResource = new Resource(
      resource,
      category,
      status,
      progress,
      startDate,
      finishDate,
      notes,
      rating
    );

    let resources = JSON.parse(localStorage.getItem("resources")) || [];
    resources.push(newResource);
    localStorage.setItem("resources", JSON.stringify(resources));
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submit behavior

  // get form values
  const resource = document.getElementById("text-input").value;
  const url = document.getElementById("url-input").value;
  const category = document.getElementById("category").value;
  const startDate = document.getElementById("start-date-input").value;
  const finishDate = document.getElementById("end-date-input").value;
  const notes = document.getElementById("notes-input").value;
  const rating = document.getElementById("rating-input").value;

  // create new Resource object
  const newResource = new Resource(
    resource,
    category,
    STATUS.PENDING,
    0,
    startDate,
    finishDate,
    notes,
    rating
  );
  myLibrary.push(newResource);
  saveLibraryToLocalStorage();
  const resourceDisplay = createResourceDisplay(newResource);
  resourceListEl.appendChild(resourceDisplay);
  form.reset();
});

// Save to localStorage
function saveLibraryToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


// Display New Submissions
function createResourceDisplay(resource) {
  const resourceElement = document.createElement("div");
  resourceElement.classList.add("resource");

  const titleElement = document.createElement("p");
  titleElement.textContent = resource.resource;
  resourceElement.appendChild(titleElement);

  const categoryElement = document.createElement("p");
  categoryElement.textContent = `Category: ${resource.category}`;
  resourceElement.appendChild(categoryElement);

  const statusElement = document.createElement("p");
  statusElement.textContent = `Status: ${resource.status}`;
  resourceElement.appendChild(statusElement);

  const progressElement = document.createElement("p");
  progressElement.textContent = `Progress: ${resource.progress}%`;
  resourceElement.appendChild(progressElement);

  const startDateElement = document.createElement("p");
  startDateElement.textContent = `Start Date: ${resource.startDate}`;
  resourceElement.appendChild(startDateElement);

  const finishDateElement = document.createElement("p");
  finishDateElement.textContent = `Finish Date: ${resource.finishDate}`;
  resourceElement.appendChild(finishDateElement);

  const notesElement = document.createElement("p");
  notesElement.textContent = `Notes: ${resource.notes}`;
  resourceElement.appendChild(notesElement);

  const ratingInputElement = resource.getRatingInput();
  resourceElement.appendChild(ratingInputElement);

  return resourceElement;
}

// Sort Option For Different Categories

// TODO: Add sorting and other resource library functionality
