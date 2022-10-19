const postsContainer = document.getElementById("posts");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const postCount = document.getElementById("post-count");

const loadUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => displayUsers(data));
};

const displayUsers = (users) => {
  const usersContainer = document.getElementById("users");
  users.slice(0, 5).forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.name;
    li.className = "mx-2 px-2 btn fs-5";
    li.setAttribute("onclick", `loadPosts('${user.id}', '${user.name}')`);
    usersContainer.appendChild(li);
  });
};

const loadPosts = (userId, name) => {
  let url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  if (!userId) {
    url = "https://jsonplaceholder.typicode.com/posts";
  }
  showSpinner(true);
  postCount.innerHTML = "";
  postsContainer.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPosts(data, name));
};

const displayPosts = (posts, name = "All") => {
  showSpinner(false);
  postCount.innerHTML = `Total Posts ${posts.length} for ${name}`;
  posts.sort((a, b) => b.id - a.id);
  console.log(posts);
  posts.forEach((post) => {
    const { title, body, id } = post;
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `<div class="border rounded h-100 p-2 d-flex flex-column justify-content-between">
    <div>
    <h5>title: ${title || "No Data Found"}</h5>
    <p>Description ${body}</p>
    <p>id: ${id}</p>
    </div>
    <div>
    <button onclick="loadPostDetails('${id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  See More
</button>
    </div>
  </div>`;
    postsContainer.appendChild(col);
  });
};

const loadPostDetails = (id) => {
  modalTitle.innerText = "Loading..";
  modalBody.innerHTML = `<h5 class="text-center">Loading..</h5>`;
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
    .then((data) => showPostDetails(data));
};

const showPostDetails = (post) => {
  const { title, body } = post;
  modalTitle.innerText = title;
  modalBody.innerHTML = `<div>
  <h5>title: ${title || "No Data Found"}</h5>
  <p>Description ${body}</p>
  </div>
  <div>`;
};

const showSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.className = "d-block";
  } else {
    spinner.className = "d-none";
  }
};
loadPosts();
loadUsers();
