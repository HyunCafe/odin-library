'use strict';

const myLibrary = [];

// Sort Function

// Save to local storage


// Factory Function for Creating Resources
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
  }

// Create Display of new rows
const tableContent = document.getElementsByClassName("resource-list__body")[0];
const tableHeaderButtons = document.querySelectorAll("th button");

const createNewRow = (resource, index) => {
    const resourceRow = document.createElement('tr');
    resourceRow.classList.add('resource-row');
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
    resourceProps.forEach(([propName, className]) => {
        const propElement = document.createElement("td");
        propElement.classList.add(className);
        propElement.textContent = resource[propName];
        resourceRow.append(propElement);
    });
    return resourceRow;
}


// Add Event listener for perform the new submission for row creation
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', (e) => {
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
    const newRow = createNewRow(newResource, myLibrary.length - 1);
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

// Save to localStorage
function saveLibraryToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }


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

// Handle Rating change and color code



