let ricePlants = [];
let numPlants = 100;
let canvasWidth = 600;
let canvasHeight = 400;
let currentPlantIndex = 0;
let soilColor;
let harvestedPlants = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  soilColor = color(139, 69, 19); // Saddle brown for soil
  // Create rice plant objects
  for (let i = 0; i < numPlants; i++) {
    let x = random(50, canvasWidth - 50);
    let y = random(100, canvasHeight - 50);
    ricePlants.push(new RicePlant(x, y));
  }
}

function draw() {
  background(soilColor);

  // Draw the rice plants
  for (let i = 0; i < ricePlants.length; i++) {
    if (!ricePlants[i].harvested) {
      ricePlants[i].draw();
    }
  }

  // Highlight the currently selected rice plant
  if (ricePlants.length > 0 && currentPlantIndex < ricePlants.length) {
    let currentPlant = ricePlants[currentPlantIndex];
    if (!currentPlant.harvested) {
      noFill();
      stroke(0, 0, 255); // Blue highlight
      strokeWeight(3);
      ellipse(currentPlant.x, currentPlant.y - currentPlant.height / 2, currentPlant.width + 10, currentPlant.height + 10);
    }
  }

  // Draw harvested stumps
  fill(101, 67, 33); // Brown for stump
  noStroke();
  for (let stump of harvestedPlants) {
    rect(stump.x - 5, stump.y, 10, 15);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    currentPlantIndex = (currentPlantIndex - 1 + ricePlants.length) % ricePlants.length;
    // Skip harvested plants
    while (ricePlants[currentPlantIndex] && ricePlants[currentPlantIndex].harvested) {
      currentPlantIndex = (currentPlantIndex - 1 + ricePlants.length) % ricePlants.length;
    }
  } else if (keyCode === RIGHT_ARROW) {
    currentPlantIndex = (currentPlantIndex + 1) % ricePlants.length;
    // Skip harvested plants
    while (ricePlants[currentPlantIndex] && ricePlants[currentPlantIndex].harvested) {
      currentPlantIndex = (currentPlantIndex + 1) % ricePlants.length;
    }
  } else if (keyCode === DOWN_ARROW || keyCode === 32) { // Down arrow or Spacebar to harvest
    if (ricePlants.length > 0 && currentPlantIndex < ricePlants.length && !ricePlants[currentPlantIndex].harvested) {
      let harvestedPlant = ricePlants[currentPlantIndex];
      harvestedPlant.harvested = true;
      harvestedPlants.push({ x: harvestedPlant.x, y: harvestedPlant.y + harvestedPlant.height / 2 }); // Store stump position
    }
  }
}

class RicePlant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(40, 70);
    this.width = 5;
    this.leafColor = color(124, 252, 0); // Bright green
    this.grainColor = color(255, 215, 0); // Gold
    this.harvested = false;
  }

  draw() {
    stroke(0);
    strokeWeight(1);
    fill(this.leafColor);
    // Stem
    rect(this.x - this.width / 2, this.y - this.height, this.width, this.height);
    // Grains (simplified)
    fill(this.grainColor);
    ellipse(this.x, this.y - this.height, this.width * 2, this.width * 2);
    ellipse(this.x - this.width, this.y - this.height + this.height * 0.2, this.width * 1.5, this.width * 1.5);
    ellipse(this.x + this.width, this.y - this.height + this.height * 0.4, this.width * 1.8, this.width * 1.8);
  }
}