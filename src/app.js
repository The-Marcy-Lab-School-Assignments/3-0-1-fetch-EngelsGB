import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';

export default function app(appDiv) {
  const page = setupPageBasics(appDiv); // Set up the page and get the divs.
  checkResponseStatus() // Get status.
  .then((statusData) => renderStatus(page.statusDiv, statusData)) // Get the status data and render it.
  .then(() => getUsers()) // Get users array.
  .then((usersData) => {renderUsers(page.usersUl, usersData);}) // Get the users data and render it.
  .then(() => {
    page.usersUl.addEventListener('click', (event) => { // Add event listener on the ul for event delegation.
      if(event.target.matches('button')) { // Check if the clicked element is a button.
        getUserPosts(event.target.dataset.userId, 3) // Call get user posts with the user id from the button.
        .then((postsData) => {renderPosts(page.postsUl, postsData)}) // Get the user posts data and render it.
      }
    });
  })
  page.newUserForm.addEventListener('submit', (event) => { // Event listener is sync code because submit events can't be async without using await keyword.
    event.preventDefault(); // Stop the form from refreshing
    // const form = event.target;
    // const formData = new FormData(form);
    // const formObject = Object.fromEntries(formData);
    // createNewUser(formObject)
    // The previous lines ^ smushed into one:
    createNewUser(Object.fromEntries(new FormData(event.target))) // Create the new user using the form data.
    .then((newUserData) => {renderNewUser(page.newUserDiv, newUserData)}) // Render the new user.
    event.target.reset(); // Reset the form.
  });
}