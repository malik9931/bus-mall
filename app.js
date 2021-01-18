"use strict";

var leftImageElement = document.getElementById("left-image");
var midImageElement = document.getElementById("mid-image");
var rightImageElement = document.getElementById("right-image");
var maxAttempts = 25;
var userAttemptsCounter = 0;
var itemsName = [];
var votesNum = [];

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
var leftImageDisplay;
var midImageDisplay;
var rightImageDisplay;

function MallImage(name, source) {
  this.name = name;
  itemsName.push(this.name);
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

//................ Add Event Listener to take the max attempts from the form
var maxAttemptsForm = document.getElementById("maxAttempt");
maxAttemptsForm.addEventListener("submit", updatingAttempts);

function updatingAttempts(event) {
  event.preventDefault();
  var updatingNewMaxAttempts = event.target.newAttempts.value;
  console.log(event.target.newAttempts.value);
  maxAttempts = updatingNewMaxAttempts;
}

//------------- Add Event Listener to View the Result
// var finalResult = document.getElementById("viewResults");
// finalResult.addEventListener("click", viewResultFun);
// function viewResultFun(event) {
//   console.log(event);
// }

//------------Add Event Listener to count the vote AND rendering another three pictures

var imgDiv = document.getElementById("images-div");
imgDiv.addEventListener("click", handleUserClick);

function handleUserClick(event) {
  // console.log(event);
  if (userAttemptsCounter < maxAttempts) {
    if (event.target.id === "left-image") {
      MallImage.prototype.allImages[leftImageIndex].votes++;
      userAttemptsCounter++;
    } else if (event.target.id === "mid-image") {
      MallImage.prototype.allImages[midImageIndex].votes++;
      userAttemptsCounter++;
    } else {
      MallImage.prototype.allImages[rightImageIndex].votes++;
      userAttemptsCounter++;
    }

    renderThreeRandomImages();
  } else {
    // handle end of voting
    var resultsList = document.getElementById("results-list");
    var mallResult;
    for (var i = 0; i < MallImage.prototype.allImages.length; i++) {
      mallResult = document.createElement("li");
      mallResult.textContent =
        "The " +
        MallImage.prototype.allImages[i].name +
        " element has " +
        MallImage.prototype.allImages[i].votes +
        " votes, and it was displayed " +
        MallImage.prototype.allImages[i].disblay +
        " times";
      resultsList.appendChild(mallResult);
    }
    imgDiv.removeEventListener("click", handleUserClick);
    console.log(removeEventListener("click", handleUserClick));

    // for (var i = 0; i < MallImage.prototype.allImages.length; i++) {
    //   votesNum.push(MallImage.prototype.allImages[i].votes);
    // }
    // chart.config.data.datasets[0].data = votesNum;
  }
}
//-------------- handle div to get the id of showing images
// var imgDiv = document.getElementById("images-div");
// imgDiv.addEventListener("load", callDiv);

// function callDiv(event) {
//   console.log(event);
// }
// callDiv;
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
  leftImageDisplay = MallImage.prototype.allImages[leftImageIndex].disblay++;
  midImageElement.src = MallImage.prototype.allImages[midImageIndex].source;
  midImageDisplay = MallImage.prototype.allImages[midImageIndex].disblay++;
  rightImageElement.src = MallImage.prototype.allImages[rightImageIndex].source;
  rightImageDisplay = MallImage.prototype.allImages[rightImageIndex].disblay++;
  // console.log(MallImage.prototype.allImages.name);
}

//--------------------- function generate random number ---------------
function generateRandomIndex() {
  return Math.floor(Math.random() * MallImage.prototype.allImages.length);
}

//----------- Adding a chrt for Result------------

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: itemsName,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: votesNum,
      },
    ],
  },

  // Configuration options go here
  options: {},
});
