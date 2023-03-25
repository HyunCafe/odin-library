# odin-library
I approached the Odin Library project by first laying out the desired table format and aesthetics. I then added the ability to create, display, and manipulate resources in the table format, including adding, editing, and deleting resources. I also implemented a feature to toggle the resource form and view full notes in a separate window. Throughout the project, I continued to simplify and improve the code by refactoring and fixing bugs. By the end, I successfully optimized the sorting feature, improved the edit and delete functionality, and resolved issues with local storage saving. Overall, this project allowed me to grow my skills in HTML, CSS, and JavaScript, particularly in creating dynamic displays and manipulating data.


### Summary of Key Features:
Factory function for creating resources
Dynamic display of resources in a table format
Sorting of resources by different columns
Saving and loading of resources from local storage
Ability to add, edit, and delete resources
Show/hide resource form with blur effect
Ability to view full notes in a separate window by clicking on truncated notes

![Project Animation](assets/library.gif)
<p align="center">
<a href="https://hyuncafe.github.io/odin-library/" target="_blank">Live Link</a>
</p>

## Project Timeline

#### Mar 4, 2023

* Feature: Added logic to append new submissions to the table

#### Mar 5, 2023

* Refactor: Adhered to the table format for the desired layout
* Style: Restyled HTML for improved aesthetics
* Style: Centered and spaced out the layout for the resource table
* Refactor: Refactored the code to align with the new table format
* Fix: Resolved bug that caused submissions to be under the incorrect category
* Style: Removed border for rating and centered text
* Feature: Added default examples to populate the table
* Feature: Truncated notes in a new window to display only the first 45 characters
* Refactor: Simplified code by removing unnecessary check logic and added real-time color changes for ratings
* Removal: Removed the URL option
* Style: Improved aesthetics and adopted a monotone 

#### Mar 6, 23023

* Style: Completed the initial layout structure and color theme
* Refactor: Made logic more modular to improve code maintainability
* Revert: Reverted to an earlier commit history due to a bug introduced during modularization
* Feature: Added material icons, edit and delete functionality with a working delete function
* Fix: Corrected a typo in the code

#### Mar 7, 2023

* Feature: Added an editable feature to highlight cell boxes and allow users to edit them
* Refactor: Removed code that will not be used
* Feature: Made resource form toggle-able and blurred the body on button click
* Refactor: Simplified the form styling by removing the login form template from a past project
* Allowed the resource form to toggle by clicking anywhere outside of it
* Style: Improved button styling
#### Mar 8, 2023

* Style: Added a background image
* Feature: Attempted to make the sort feature work but with limited 

#### Mar 9, 2023

* Improved the sort function to work as intended, except for dates and category
* Documentation: Added bug comments for future reference and debugging

#### Mar 10, 2023

* Refactor: Simplified and improved logic by redoing the old script.js and haitus.js files
* Fix: Corrected the tableContent variable to select the first element of the HTML collection for the table
* Fix: Resolved an issue with the resource property name to a valid one
* Refactor: Renamed some HTML values for proper JS population
* Feature: Optimized the sort feature to sort by category as desired
* Feature: Improved the edit and delete functionality by adding logic from haitus.js
* Addition: Added assets to the project
  
#### Mar 11, 2023

* Fix: Resolved an issue with local storage saving to ensure it works properly


TODO: Add color coded rating, make it more semantic, add more aesthetic features, and create validations and requirements for form input
