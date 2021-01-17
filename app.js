"use strict";

var leftImageElement = document.getElementById("left-image");
var midImageElement = document.getElementById("mid-image");
var rightImageElement = document.getElementById("right-image");
var maxAttempts = 5;
var userAttemptsCounter = 0;

// // updating the maxAttempts
// var form = document.getElementById("container");
// form.addEventListener("submit", addingShop);

// function addingShop(event) {
//   var shopInputedName = event.target.shopNameInput.value;
//   maxAttempts = shopInputedName;
// }
///////////////////////////////////////
var leftImageIndex;
var midImageIndex;
var rightImageIndex;

function MallImage(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.disblay = 0;
  MallImage.prototype.allImages.push(this);
}

MallImage.prototype.allImages = [];

new MallImage("bag", "img/bag.jpg");
new MallImage("banana", "img/banana.jpg");
new MallImage("bathroom", "img/bathroom.jpg");
new MallImage("boots", "img/boots.jpg");
new MallImage("breakfast", "img/breakfast.jpg");
new MallImage("bubblegum", "img/bubblegum.jpg");

new MallImage("chair", "img/chair.jpg");
new MallImage("cthulhu", "img/cthulhu.jpg");
new MallImage("dog-duck", "img/dog-duck.jpg");
new MallImage("dragon", "img/dragon.jpg");
new MallImage("pen", "img/pen.jpg");
new MallImage("pet-sweep", "img/pet-sweep.jpg");

new MallImage("scissors", "img/scissors.jpg");
new MallImage("shark", "img/shark.jpg");
new MallImage("sweep", "img/sweep.png");
new MallImage("tauntaun", "img/tauntaun.jpg");
new MallImage("unicorn", "img/unicorn.jpg");
new MallImage("usb", "img/usb.gif");

new MallImage("water-can", "img/water-can.jpg");
new MallImage("wine-glass", "img/wine-glass.jpg");

console.log(MallImage.prototype.allImages);

/////////////----------------------------------------------------

leftImageElement.addEventListener("click", handleUserClick);
midImageElement.addEventListener("click", handleUserClick);
rightImageElement.addEventListener("click", handleUserClick);

function handleUserClick(event) {
  userAttemptsCounter++;

  if (userAttemptsCounter <= maxAttempts) {
    if (event.target.id === "left-image") {
      MallImage.prototype.allImages[leftImageIndex].votes++;
    } else if (event.target.id === "mid-image") {
      MallImage.prototype.allImages[midImageIndex].votes++;
    } else {
      MallImage.prototype.allImages[rightImageIndex].votes++;
    }

    renderThreeRandomImages();
  } else {
    // handle end of voting
    var resultsList = document.getElementById("results-list");
    var mallResult;
    for (var i = 0; i < MallImage.prototype.allImages.length; i++) {
      mallResult = document.createElement("li");
      mallResult.textContent =
        MallImage.prototype.allImages[i].name +
        "has " +
        MallImage.prototype.allImages[i].votes +
        " votes";
      resultsList.appendChild(mallResult);
    }
    rightImageElement.removeEventListener("click", handleUserClick);
    leftImageElement.removeEventListener("click", handleUserClick);
  }
}

//...................... render and do not dublicate the content.....
var imgIndex = [];
renderThreeRandomImages();
function renderThreeRandomImages() {
  leftImageIndex = generateRandomIndex();
  imgIndex.push(leftImageIndex);
  do {
    midImageIndex = generateRandomIndex();
    imgIndex.push(midImageIndex);

    rightImageIndex = generateRandomIndex();
    imgIndex.push(rightImageIndex);
  } while (
    leftImageIndex === rightImageIndex ||
    leftImageIndex === midImageIndex ||
    midImageIndex === rightImageIndex
  );

  leftImageElement.src = MallImage.prototype.allImages[leftImageIndex].source;
  midImageElement.src = MallImage.prototype.allImages[midImageIndex].source;
  rightImageElement.src = MallImage.prototype.allImages[rightImageIndex].source;
}

//--------------------- function generate random number ---------------
function generateRandomIndex() {
  return Math.floor(Math.random() * MallImage.prototype.allImages.length);
}
