function plank() {
  // After 30 seconds plank should register for user every second
  if (taskName === "plank" && prediction[i].probability >= 0.75) {
    return true;
  }
}

function treePose() {
  if (taskName === "tree pose" && prediction[i].probability >= 0.75) {
    return true;
  }
}

function watching() {
  if (taskName === "watching" && prediction[i].probability >= 0.75) {
    return true;
  }
}

function typing() {
  if (taskName === "typing" && prediction[i].probability >= 0.75) {
    return true;
  }
}

function sitUps() {
  if (taskName === "Sit-up" && prediction[i].probability >= 0.75) {
    return true;
  }
}

function jumpingJack() {
  if (taskName === "jumping jack" && prediction[i].probability >= 0.75) {
    return true;
  }
}
function standStill() {
  if (taskName === "standing still" && prediction[i].probability >= 0.75) {
    return true;
  }
}


//below has no models
function stretches() {
  if (taskName === "arm-stretch") {
    return true;
  }
}

function chairPose() {
  if (taskName === "chaire pose") {
    return true;
  }
}