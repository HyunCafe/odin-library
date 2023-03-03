"use strict";

const range = document.querySelector('.main__range');
const progressBar = document.querySelector('.main__progress');

let myLibrary = [];

// Define enum for constant values
const STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
};

// Define ResourceList class
class ResourceList {
  constructor(
    resource = "",
    type = "",
    status = STATUS.PENDING,
    completion = 0,
    startDate = "",
    finishDate = "",
    notes = ""
  ) {
    this.resource = resource;
    this.type = type;
    this.status = status;
    this.completion = completion;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.notes = notes;
  }

  // Function to update the status of a resource
  updateStatus(newStatus) {
    if (Object.values(STATUS).includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  }

  // Function to get the completion percentage of a resource
  getCompletionProgressBar() {
    const percentage = this.completion;
    let color;
    if (percentage >= 70) {
      color = "green";
    } else if (percentage >= 20) {
      color = "blue";
    } else {
      color = "yellow";
    }
    return `<div class="progress-bar" style="width: ${percentage}%; background-color: ${color};"></div>`;
  }
}

// Example usage
const resource1 = new ResourceList(
  "JavaScript",
  "Tutorial",
  STATUS.IN_PROGRESS,
  50,
  "2023-02-28",
  "",
  "Some notes"
);

// Will Create a library in which you can sort and  add, delete, rate, percentage completed, Date Started,, notes

// Sort Option For Different Categories
