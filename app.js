"use strict";

var leftImageElement = document.getElementById("left-image");
var midImageElement = document.getElementById("mid-image");
var rightImageElement = document.getElementById("right-image");
var maxAttempts = 25;
var userAttemptsCounter = 0;
var itemsName = [];
var votesNum = [];
var displayNum = [];

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

//------------- Add Event Listener to Disabled the Result Button
var finalResult = document.getElementById("finalResult");
finalResult.addEventListener("click", showResult);

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
    finalResult.removeAttribute("disabled");
    imgDiv.removeEventListener("click", handleUserClick);

    // chart.config.data.datasets[0].data = votesNum;
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

//----------- Adding a Result as a Chart ------------
function showResult() {
  for (var i = 0; i < MallImage.prototype.allImages.length; i++) {
    votesNum.push(MallImage.prototype.allImages[i].votes);
    displayNum.push(MallImage.prototype.allImages[i].disblay);
  }
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: itemsName,
      datasets: [
        {
          label: "Number of Displaying",
          backgroundColor: "rgb(0, 197, 106)",
          data: displayNum,
        },
        {
          label: "Number of Voting",
          backgroundColor: "rgb(255, 114, 107)",
          data: votesNum,
        },
      ],
    },
  });
}
