"use strict";

// Variables
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

// Define resourceList object
const resourceList = {
  resource: "",
  category: "",
  status: STATUS.PENDING,
  completion: 0,
  startDate: "",
  finishDate: "",
  notes: "",
  rating: 0,
  updateStatus: function (newStatus) {
    if (Object.values(STATUS).includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  },
  handleRatingChange: function (event) {
    const newRating = parseInt(event.target.value);
    if (isNaN(newRating) || newRating < 1 || newRating > 10) {
      throw new Error("Invalid rating");
    }
    this.rating = newRating;
  },
  getRatingInput: function() {
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
  },
};


// Example usage
const resource1 = Object.create(resourceList);
resource1.resource = "JavaScript";
resource1.category = "Tutorial";
resource1.status = STATUS.IN_PROGRESS;
resource1.completion = 50;
resource1.startDate = "2023-02-28";
resource1.finishDate = "";
resource1.notes = "Some notes";

// Will Create a library in which you can sort and  add, delete, rate, percentage completed, Date Started,, notes

// Sort Option For Different Categories
