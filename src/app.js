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
  const page = setupPageBasics(appDiv); // Set up the page
  checkResponseStatus() // Call check status
    .then((statusData) => renderStatus(page.statusDiv, statusData)) // Render the status
    .then(() => getUsers()) // Call getUsers
    .then((usersData) => {renderUsers(page.usersUl, usersData);}) // Render the users
    .then(() => { // Event listeners for the buttons
      for (let i = 0; i < page.usersUl.children.length; i++) {
        page.usersUl.children[i].addEventListener('click', (e) => {
          if (e.target.matches("button")) {
            getUserPosts(e.target.getAttribute("data-user-id"), 3)
              .then((postsData) => {renderPosts(page.postsUl, postsData)}) // render posts
          }
        })
      }
    })
    .then(() => {
      page.newUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData);
        console.log(formObject);
        createNewUser(formObject)
          .then((newUserData) => {renderNewUser(page.newUserDiv, newUserData)}) // Render form values
        e.target.reset();
        });
    })
}