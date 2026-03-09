let allPosts = [];
let currentTab = "all";

// fetch all issues
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {
    allPosts = data.data;
    switchTab("all"); // initial load
  })
  .catch(err => console.error("Fetch error:", err));

// tab switch
function switchTab(tab) {
  currentTab = tab;

  ["all","open","closed"].forEach(id => {
    const btn = document.getElementById(id);
    if(id === tab){
      btn.classList.add("bg-blue-700","text-white");
    } else {
      btn.classList.remove("bg-blue-700","text-white");
    }
  });

  const filtered = tab === "all" ? allPosts : allPosts.filter(post => post.status === tab);

  display(filtered);
  updateCounter(tab, filtered);
}

// display cards
function display(posts) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  posts.forEach(post => {
    const borderColor = post.status === "open" ? "border-green-500" : "border-purple-500";
    const statusIcon = post.status === "open"
      ? "assets/Open-Status.png"
      : "assets/Closed- Status .png";

    const card = document.createElement("div");
    card.className = `bg-white p-4 shadow border-t-4 ${borderColor} cursor-pointer transition-all duration-300`;

    card.innerHTML = `
      <div class="flex justify-between items-center">
        <img src="${statusIcon}" class="w-5 h-5">
        <div class="badge bg-yellow-200 border border-yellow-600 text-yellow-700">${post.priority}</div>
      </div>
      <h1 class="font-bold text-xl line-clamp-2 mt-2">${post.title}</h1>
      <p class="text-gray-500 line-clamp-2 mt-1">${post.description}</p>
      <div class="flex gap-2 mt-2">
        ${post.labels.filter(label => label).map(label => `<span class="badge bg-blue-200 text-blue-700">${label}</span>`).join('')}
      </div>
      <hr class="my-2">
      <p class="text-gray-500">${post.author}</p>
      <p class="text-gray-400 text-sm">${post.updatedAt}</p>
    `;

    // click card → open modal
    card.addEventListener("click", () => {
      const overlay = document.getElementById("overlay");
      const overlayBody = document.getElementById("overlayBody");

      overlayBody.innerHTML = `
        <div class="flex justify-between items-center">
          <img src="${statusIcon}" class="w-6 h-6">
          <div class="badge bg-yellow-200 border border-yellow-600 text-yellow-700">${post.priority}</div>
        </div>
        <h1 class="font-bold text-2xl mt-2">${post.title}</h1>
        <p class="text-gray-700 mt-2">${post.description}</p>
        <div class="flex gap-2 mt-2">
          ${post.labels.filter(label => label).map(label => `<span class="badge bg-blue-200 text-blue-700">${label}</span>`).join('')}
        </div>
        <hr class="my-2">
        <p class="text-gray-500">Author: ${post.author}</p>
        <p class="text-gray-400 text-sm">Updated: ${post.updatedAt}</p>
      `;

      overlay.classList.remove("hidden"); 
    });

    container.appendChild(card);
  });
}

// update counter dynamically
function updateCounter(tab, posts) {
  const issueElem = document.getElementById("issueCount");
  let text = "";

  if(tab === "all") text = `All Issues (${posts.length})`;
  else if(tab === "open") text = `Open Issues (${posts.length})`;
  else text = `Closed Issues (${posts.length})`;

  issueElem.innerHTML = `<img src="assets/Aperture.png" alt="" class="w-6 h-6"> ${text}`;
}


  document.getElementById("closeOverlay").addEventListener("click", () => {
      document.getElementById("overlay").classList.add("hidden");
    });