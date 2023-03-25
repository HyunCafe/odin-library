"use strict";

let myLibrary = [];

// Factory Function for Creating Resources
class Resource {
  constructor(resource, category, status, startDate, endDate, notes, rating) {
    this.resource = resource;
    this.category = category;
    this.status = status || STATUS.PENDING;
    this.startDate = startDate || "";
    this.endDate = endDate || "";
    this.notes = notes || "";
    this.rating = rating || 0;
  }
}

// Create Display of new rows
const tableContent = document.getElementsByClassName("resource-list__body")[0];
const tableHeaderButtons = document.querySelectorAll("th button");

class ResourceRow {
  constructor(resource, index) {
    const createResourceRow = document.createElement("tr");
    createResourceRow.classList.add("resource-row");
    createResourceRow.dataset.index = index;

    const resourceProps = [
      ["rating", "rating"],
      ["resource", "resource"],
      ["category", "category"],
      ["status", "status"],
      ["startDate", "start-date"],
      ["endDate", "end-date"],
      ["notes", "notes"],
      ["options", "options"],
    ];

    resourceProps.forEach(([propName, className]) => {
      const propElement = document.createElement("td");
      propElement.classList.add(className);
      createResourceRow.append(propElement);

      switch (propName) {
        case "notes":
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
              win.document.body.append(fullNotesElem);
            });
            propElement.append(truncatedNotesElem);
          } else {
            propElement.textContent = resource[propName];
          }
          break;
        case "options":
          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add("material-icons", "md-18", "md-dark");
          deleteIcon.textContent = "delete";
          deleteIcon.addEventListener("click", () => {
            tableContent.removeChild(createResourceRow);
            myLibrary.splice(index, 1);
            saveLibraryToLocalStorage();
          });
          const editIcon = document.createElement("i");
          editIcon.classList.add("material-icons", "md-18", "md-dark");
          editIcon.textContent = "edit";
          editIcon.addEventListener("click", () => {
            const resourceInputs =
              createResourceRow.querySelectorAll("td:not(.options)");
            resourceInputs.forEach((input) => {
              if (!input.classList.contains("editable")) {
                input.setAttribute("contenteditable", "true");
              } else {
                input.removeAttribute("contenteditable");
              }
              input.classList.toggle("editable");
            });
          });
          propElement.append(editIcon);
          propElement.append(deleteIcon);
          break;
        default:
          propElement.textContent = resource[propName];
      }
    });
    return createResourceRow;
  }
}

// Get data and save to variable for referencing
const getTableContent = (data) => {
  data.forEach((resource, index) => {
    const newRow = new ResourceRow(resource, index);
    tableContent.append(newRow);
  });
};

//   Sorts by Column
const sortData = (data, param, direction = "asc") => {
  tableContent.textContent = "";
  const sortedData = [...data].sort((a, b) => {
    let aValue, bValue;
    switch (param) {
      case "resource-rating":
        aValue = Number(a.rating);
        bValue = Number(b.rating);
        break;
      case "resource-name":
        aValue = a.resource.toLowerCase();
        bValue = b.resource.toLowerCase();
        break;
      case "resource-category":
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      case "resource-status":
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      case "resource-start-date":
        aValue = new Date(a.startDate);
        bValue = new Date(b.startDate);
        break;
      case "resource-end-date":
        aValue = new Date(a.endDate);
        bValue = new Date(b.endDate);
        break;
      case "resource-notes":
        aValue = a.notes.toLowerCase();
        bValue = b.notes.toLowerCase();
        break;
      case "resource-options":
        aValue = null;
        bValue = null;
        break;
      default:
        aValue = null;
        bValue = null;
        break;
    }
    if (aValue === null || bValue === null) return 0;
    return direction === "asc"
      ? aValue < bValue
        ? -1
        : aValue > bValue
        ? 1
        : 0
      : bValue < aValue
      ? -1
      : bValue > aValue
      ? 1
      : 0;
  });
  getTableContent(sortedData);
};

// Reset other sorts except column clicked
const resetButtons = (event) => {
  [...tableHeaderButtons].map((button) => {
    if (button !== event.target) {
      button.removeAttribute("data-dir");
    }
  });
};

window.addEventListener("load", () => {
  [...tableHeaderButtons].map((button) => {
    button.addEventListener("click", (e) => {
      resetButtons(e);
      if (e.target.getAttribute("data-dir") == "desc") {
        sortData(myLibrary, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        sortData(myLibrary, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });
});

// Add Event listener for perform the new submission for row creation
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

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
  const newRow = new ResourceRow(newResource, myLibrary.length - 1);
  tableContent.append(newRow);

  // reset form values
  document.getElementById("resource-input").value = "";
  document.getElementById("category-input").value = "";
  document.getElementById("status-input").value = "Pending";
  document.getElementById("start-date-input").value = "";
  document.getElementById("end-date-input").value = "";
  document.getElementById("notes-input").value = "";
  document.getElementById("rating-input").value = "";
});

// Toggle Resource form show, blur rest
function addResourceFormShow(event) {
  const addResourceBtn = document.querySelector(".add-resource-btn");
  const resourceForm = document.querySelector(".resource-form");
  const resourceSection = document.querySelector(".resource-section");

  addResourceBtn.addEventListener("click", () => {
    if (window.getComputedStyle(resourceForm).display === "none") {
      resourceForm.style.display = "block";
      resourceSection.style.filter = "blur(2px)";
      document.body.style.transition = "all 0.3s ease-in-out";
    } else {
      resourceForm.style.display = "none";
      resourceSection.style.filter = "";
      document.body.style.transition = "all 0.3s ease-in-out";
    }
    // ability to hide display if click anywhere on body but resource form
    document.addEventListener("click", (event) => {
      if (
        !addResourceBtn.contains(event.target) &&
        !resourceForm.contains(event.target)
      ) {
        resourceForm.style.display = "none";
        resourceSection.style.filter = "";
        document.body.style.transition = "all 0.3s ease-in-out";
      }
    });
  });
}
addResourceFormShow();

// Load library from local storage on page load
window.addEventListener("load", () => {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
  } else {
    myLibrary = [];
  }

  const resourceExists = (resourceName) => {
    return myLibrary.some((resource) => resource.resource === resourceName);
  };

  // Check if the library is empty or does not exist, then add default resources
  if (!resourceExists("The Odin Project") || !resourceExists("FreeCodeCamp")) {
    defaultResources.forEach((resource) => {
      if (!resourceExists(resource.resource)) {
        myLibrary.push(resource);
      }
    });
    // Save the updated library to local storage
    saveLibraryToLocalStorage();
  }

  // Render the library
  myLibrary.forEach((resource, index) => {
    const newRow = new ResourceRow(resource, index);
    tableContent.append(newRow);
  });
});

// Save library to local storage whenever it changes
const saveLibraryToLocalStorage = () => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

// The two default resources
const defaultResources = [
  {
    resource: "The Odin Project",
    category: "Online Course",
    status: "In Progress",
    startDate: "2022-12-15",
    endDate: "",
    notes: "Little hand holding, Great Resource",
    rating: 9,
  },
  {
    resource: "FreeCodeCamp",
    category: "Online Course",
    status: "Hiatus",
    startDate: "2022-12-15",
    endDate: "2023-01-15",
    notes: "Awesome Resource but too much hand holding",
    rating: 6,
  },
];

// Handle Rating change and color code
