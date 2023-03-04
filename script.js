"use strict";

// Variables
const submitBtn = document.querySelector('button[type="submit"]');

const rating = this.rating;
let color;
let myLibrary = [];

// Define enum for constant values
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

  this.updateStatus = function (newStatus) {
    if (Object.values(STATUS).includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  };

  this.handleRatingChange = function (event) {
    const newRating = parseInt(event.target.value);
    if (isNaN(newRating) || newRating < 1 || newRating > 10) {
      throw new Error("Invalid rating");
    }
    this.rating = newRating;
  };

  this.getRatingInput = function () {
    let color;
    if (this.rating >= 7) {
      color = "green";
    } else if (this.rating >= 2) {
      color = "blue";
    } else {
      color = "yellow";
    }
    return (
      <div class="rating-bar">
        <input
          type="number"
          min="1"
          max="10"
          step="1"
          value={this.rating}
          onChange={this.handleRatingChange}
          style={{ backgroundColor: color }}
        />
      </div>
    );
  };
}

// Example usage
const resource1 = new Resource(
  "JavaScript",
  "coding-challenge",
  STATUS.IN_PROGRESS,
  50,
  "2023-02-28",
  "",
  "Some notes",
  8
);

// Submit Form Logic

// Will Create a library in which you can sort and  add, delete, rate, percentage completed, Date Started,, notes

// Sort Option For Different Categories
