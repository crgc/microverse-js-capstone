const singlePokemon = [
  {
      "pokemon":"ditto",
      "image_url": "https://cdn.vox-cdn.com/thumbor/3ajecDMOIH59cbOeyO0bap_4wj4=/0x0:2257x1320/1200x800/filters:focal(949x480:1309x840)/cdn.vox-cdn.com/uploads/chorus_image/image/63738986/pokemon.0.0.png",
      "comments":[],
      "likes": 0
  }
]

const displayComment = document.createElement("div")


export const commentModal = () => {
  let commentModal = document.createElement("div")
  let modal = document.getElementById("comment-modal")
  commentModal.className = "modal"
  const commentBtn = document.createElement("button")
  commentBtn.textContent = "Comment"

  commentModal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>
  <img src="${singlePokemon.image_url}" class="w-50 h-75 container border border-dark mb-3"></img>
  <h3 class="text-center mb-3">${singlePokemon.pokemon}</h3>
  <form action="" class="form-group w-50 container" id="add-comment">
  <h6 class="text-center mb-3">Add a comment</h6>
  <input type="text" placeholder="Your name" class="form-control mb-3" id="namefield1">
  <textarea placeholder="Your insights" class="form-control mb-3" id="insightfield"></textarea>
  <button type="submit" id="add-comment">Comment</button>
</form>
  </div>
  `
  commentModal.querySelector("#add-comment").addEventListener("submit", (e) => {
    e.preventDefault()
    const namefield = commentModal.querySelector("#namefield1").value
    const  commentfield = commentModal.querySelector("#insightfield").value  
  displayComment.innerHTML = `
    <p class="text-center"><span>${namefield}</span>${commentfield}</p>
  `
  })



let span = commentModal.querySelector(".close");
span.addEventListener("click", () => {
  commentModal.style.display = "none";
})
commentBtn.addEventListener("click", () => {
  commentModal.style.display = "block";
})

window.onclick = function(event) {
  if (event.target == commentModal) {
    commentModal.style.display = "none";
  }
}

modal.appendChild(commentBtn)
modal.appendChild(displayComment)
modal.appendChild(commentModal)
}