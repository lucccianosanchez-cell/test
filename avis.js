
const reviewsContainer = document.getElementById("reviews");
const form = document.getElementById("reviewForm");

function loadReviews(){

const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviewsContainer.innerHTML = "";

reviews.forEach(r => {

const div = document.createElement("div");
div.className = "review";

div.innerHTML = `
<h3>${r.name}</h3>
<p class="stars">${"⭐".repeat(r.rating)}</p>
<p>${r.comment}</p>
`;

reviewsContainer.appendChild(div);

});

}

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const rating = document.getElementById("rating").value;
const comment = document.getElementById("comment").value;

const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviews.push({name,rating,comment});

localStorage.setItem("reviews", JSON.stringify(reviews));

form.reset();

loadReviews();

});

loadReviews();
