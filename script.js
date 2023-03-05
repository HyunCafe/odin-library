"use strict";

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
  startDate,
  endDate,
  notes,
  rating
) {
  this.resource = resource;
  this.category = category;
  this.status = status || STATUS.PENDING;
  this.startDate = startDate || "";
  this.endDate = endDate || "";
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

  this.getRatingInput = function () {
    const div = document.createElement("div");
    div.classList.add("rating-bar");

    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "10");
    input.setAttribute("step", "1");
    input.value = this.rating;
    input.addEventListener("change", this.handleRatingChange);

    let color;
    if (this.rating >= 7) {
      color = "green";
    } else if (this.rating >= 2) {
      color = "blue";
    } else {
      color = "yellow";
    }
    input.style.color = color;

    div.appendChild(input);
    return div;
  };
}

// Submit Form Logic
const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector(".resource-form");
const resourceList = document.querySelector(".resource-list");

function updateResourceFromForm(index) {
  const resourceContainer = document.querySelector(`[data-index="${index}"]`);
  const resourceInputs = Array.from(
    resourceContainer.querySelectorAll("input, select")
  );
  const resourceValues = resourceInputs.reduce((values, input) => {
    const key = input.id.replace("-input", "");
    values[key] = input.value;
    return values;
  }, {});

  const currentResource = myLibrary[index];
  Object.assign(currentResource, resourceValues);
  saveLibraryToLocalStorage();
}

// Save to localStorage
function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // get form values
  const resource = document.getElementById("resource-input").value;
  const category = document.getElementById("category-input").value;
  const status = document.getElementById("status-input").value;
  const startDate = document.getElementById("start-date-input").value;
  const endDate = document.getElementById("end-date-input").value;
  const notes = document.getElementById("notes-input").value;
  const rating = document.getElementById("rating-input").value;

  // create Resource object
  const newResource = new Resource(
    resource,
    category,
    status,
    startDate,
    endDate,
    notes,
    rating
  );

  // add Resource object to myLibrary array and update display
  myLibrary.push(newResource);
  saveLibraryToLocalStorage();
  const resourceDisplay = createResourceDisplay(
    newResource,
    myLibrary.length - 1
  );
  resourceList.appendChild(resourceDisplay);

  // reset form values
  form.reset();
});

// Create the resource display and populate it in correct columns
function createResourceDisplay(resource, index) {
  const resourceRow = document.createElement("tr");
  resourceRow.classList.add("resource-row");
  resourceRow.dataset.index = index;

  const resourceProps = [
    ["rating", "rating"],
    ["resource", "resource"],
    ["category", "category"],
    ["status", "status"],
    ["startDate", "start-date"],
    ["finishDate", "finish-date"],
    ["notes", "notes"],
    ["options", "options"],
  ];

  const ratingElement = resource.getRatingInput();
  const ratingCell = document.createElement("td");
  ratingCell.appendChild(ratingElement);
  resourceRow.appendChild(ratingCell);

  resourceProps.forEach(([propName, className]) => {
    const propElement = document.createElement("td");
    propElement.classList.add(className);
    if (propName === "rating") {
      propElement.style.display = "none";
    } else if (propName === "notes") {
      if (resource[propName].length > 100) {
        const truncatedNotes = resource[propName].slice(0, 45) + "...";
        const truncatedNotesElem = document.createElement("span");
        truncatedNotesElem.textContent = truncatedNotes;
        truncatedNotesElem.classList.add("notes-truncated");
        const fullNotesElem = document.createElement("div");
        fullNotesElem.classList.add("notes-full");
        fullNotesElem.textContent = resource[propName];
        truncatedNotesElem.addEventListener("click", () => {
          const win = window.open("", "Notes", "width=400,height=400");
          win.document.body.appendChild(fullNotesElem);
        });
        propElement.appendChild(truncatedNotesElem);
      } else {
        propElement.textContent = resource[propName];
      }
    } else {
      propElement.textContent = resource[propName];
    }
    resourceRow.appendChild(propElement);
  });

  return resourceRow;
}

// Add default test case
const defaultResource = new Resource(
  "The Odin Project",
  "Online Course",
  "In Progress",
  "2022-12-15",
  "",
  "No Hand Holding, Great Resource",
  9
);
myLibrary.push(defaultResource);
const defaultResourceDisplay = createResourceDisplay(
  defaultResource,
  myLibrary.length - 1
);
resourceList.appendChild(defaultResourceDisplay);

// Sort Option For Different Categories

// TODO: Add sorting and other resource library functionality
