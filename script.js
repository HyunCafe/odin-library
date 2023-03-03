"use strict";

const range = document.querySelector(".main__range");
const progressBar = document.querySelector(".main__progress");

let myLibrary = [];

// Define enum for constant values
const STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
};

// Define resourceList object
const resourceList = {
  resource: "",
  type: "",
  status: STATUS.PENDING,
  completion: 0,
  startDate: "",
  finishDate: "",
  notes: "",
  updateStatus: function (newStatus) {
    if (Object.values(STATUS).includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  },
  getCompletionProgressBar: function () {
    const percentage = this.completion;
    let color;
    if (percentage >= 70) {
      color = "green";
    } else if (percentage >= 20) {
      color = "blue";
    } else {
      color = "yellow";
    }
    return (
      <div
        class="progress-bar"
        style="width: ${percentage}%; background-color: ${color};"
      ></div>
    );
  },
};

// Example usage
const resource1 = Object.create(resourceList);
resource1.resource = "JavaScript";
resource1.type = "Tutorial";
resource1.status = STATUS.IN_PROGRESS;
resource1.completion = 50;
resource1.startDate = "2023-02-28";
resource1.finishDate = "";
resource1.notes = "Some notes";

// Will Create a library in which you can sort and  add, delete, rate, percentage completed, Date Started,, notes

// Sort Option For Different Categories
