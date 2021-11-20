let currentDot = "";
let scoreInRow = 0;
let currentIntervalID = "";
let interval = 50;
let hardcoreMode = false;

const createToggle = () => {
  let hardcoreSetting = document.createElement("div");
  hardcoreSetting.setAttribute("id", "hardcore-setting");
  let hardcoreToggle = document.createElement("label");
  hardcoreToggle.setAttribute("class", "switch");
  let hardcoreLabel = document.createElement("div");
  hardcoreLabel.textContent = "Hardcore";
  let toggleInput = document.createElement("input");
  toggleInput.setAttribute("type", "checkbox");
  hardcoreToggle.appendChild(toggleInput);
  let toggleSpan = document.createElement("span");
  toggleSpan.setAttribute("class", "slider round");
  hardcoreToggle.appendChild(toggleSpan);
  hardcoreSetting.appendChild(hardcoreLabel);
  hardcoreSetting.appendChild(hardcoreToggle);
  document.body.appendChild(hardcoreSetting);

  toggleInput.addEventListener("change", function() {
    hardcoreMode = this.checked;
    resetScore();
  });
};

document.addEventListener("click", event => {
  var dot = document.getElementById("dot");
  var isClickInside = dot.contains(event.target);

  if (isClickInside) {
    catchDot();
  } else if (hardcoreMode) {
    fail();
  }
});

const setInRow = () => {
  if (document.getElementById("score-in-row")) {
    let scoreInRowElement = document.getElementById("score-in-row");
    scoreInRowElement.textContent = "In row: " + scoreInRow;
  } else {
    let scoreInRowElement = document.createElement("div");
    scoreInRowElement.setAttribute("id", "score-in-row");
    scoreInRowElement.textContent = "In row: " + scoreInRow;
    document.body.appendChild(scoreInRowElement);
  }
};

const createDot = () => {
  currentDot = document.createElement("div");
  currentDot.setAttribute("id", "dot");
  let size = Math.floor(Math.random() * (100 - 30 + 1) + 30);
  currentDot.style.width = size + "px";
  currentDot.style.height = currentDot.style.width;
  let left = Math.floor(
    Math.random() * (window.innerWidth - 1.5 * size + 1) + size / 2
  );
  let top = Math.floor(
    Math.random() * (window.innerHeight - 300 - size / 2 + 1) + size / 2
  );
  currentDot.style.left = left + "px";
  currentDot.style.top = top + "px";
  currentDot.className += " " + "dot";
  currentIntervalID = setInterval(moveDot, interval);
  document.body.appendChild(currentDot);
};

const moveDot = () => {
  var offsets = document.getElementById("dot").getBoundingClientRect();
  var top = offsets.top + 3;
  if (top > window.innerHeight) {
    scoreInRow = 0;
    setInRow();
    interval = 50;
    recreateDot();
  } else {
    currentDot.style.top = top + "px";
  }
};

const resetScore = () => {
  scoreInRow = 0;
  setInRow();
  interval = 50;
}

const fail = () => {
  resetScore();
  recreateDot();
};

const catchDot = () => {
  scoreInRow++;
  setInRow();
  if (scoreInRow < 49) {
    interval = 50 - scoreInRow;
  }
  recreateDot();
};

const recreateDot = () => {
  clearInterval(currentIntervalID);
  document.getElementById("dot").remove();
  createDot();
};

setInRow();
createToggle();
createDot();
