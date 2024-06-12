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
  // Basic page setup
  const basics = setupPageBasics(appDiv);
  // Status
  checkResponseStatus()
    .then((response) => {
      renderStatus(basics.statusDiv, response);
    })
  // Users
  getUsers()
    .then((response) => {
      renderUsers(basics.usersUl, response);
      document.querySelectorAll(".user-card").forEach((button) => button.addEventListener('click', (e) => {
        if (e.target.matches("button")) {
          const id = e.target.getAttribute("data-user-id");
          getUserPosts(id, 3)
            .then((response) => {
              renderPosts(basics.postsUl, response);
            });
        }
      }));
    })
  // Form
  basics.newUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.querySelector('#username') && document.querySelector('#email')) {
      const obj = {
        username: document.querySelector('#username').value,
        email: document.querySelector('#email').value
      }
      createNewUser(obj)
        .then((response) => {
          renderNewUser(basics.newUserDiv, response);
        })
      e.target.reset();
    }
  });
}