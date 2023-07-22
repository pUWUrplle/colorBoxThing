export default class colorList {
  selectState = 0; //1=true,0=false,2=indeterminate
  itemAmount = 0; //can replace this by just counting elements in any of the following arrays
  colorArray = [];
  colorCount = [];
  colorState = [];
  scrambledArray = [];
  scrambleState = false;

  constructor() {
    this.selectState = 0;
    this.itemAmount = Math.floor(4 + Math.random() * 6); // 4 and 6 can be parametered to set min and max amount of colors
    for (let i = 0; i < this.itemAmount; i++) {
      this.colorArray[i] =
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6); //random color roll
      this.colorCount[i] = Math.floor(Math.random() * 5); //color ammount roll
      this.colorState[i] = false;
    }
  }
  decColorCount(colorId) {
    if (this.colorCount[colorId] > 0) {
      this.colorCount[colorId]--;
      let reactivityReset = { ...this.colorCount };
      this.colorCount = reactivityReset;
    } //decrement for removing color boxes on click
  }
  decSortedColor(arrayId) {
    console.log(arrayId);
    if (this.colorCount[this.scrambledArray[arrayId]] > 0) {
      this.colorCount[this.scrambledArray[arrayId]]--;
      this.scrambledArray.splice(arrayId, 1);
      console.log(this.scrambledArray);
    }
    //same responsiveness issue as checkboxes
  }
  scramble(stateFlip = true) {
    if (stateFlip == false) this.scrambleState = !this.scrambleState;
    if (this.scrambleState) {
      this.scrambleState = false;
      return;
    }
    this.scrambledArray = [];
    this.scrambleState = true;
    let tempCount = { ...this.colorCount };
    let globalColorCount = 0;
    for (let i = 0; i < this.itemAmount; i++) {
      if (this.colorState[i] == true) globalColorCount += this.colorCount[i]; //calculates the amount of colors, needed to be randomized
    }
    for (let j = 0; j < globalColorCount; j++) {
      let randomRoll =
        1 + Math.floor(Math.random() * (globalColorCount - 1 - j)); // roll a random color number from 1 to color count,
      for (let i = 0; i < this.itemAmount; i++) {
        if (this.colorState[i] == true && tempCount[i] > 0) {
          randomRoll -= tempCount[i];
          if (randomRoll <= 0) {
            tempCount[i]--; //when random roll is < then summ of elements in counted arrays (including the one we are looking at right now) we add a color from current array to scrambled array
            this.scrambledArray.push(i);
          }
        }
      }
    }
    console.log("randomization happened");
    console.log(this.scrambledArray);
  }
  nonbinaryCheckboxChange() {
    let newVal = true; // ran out of time to fix this properly.
    if (this.selectState == 0 || this.selectState == 2) {
      newVal = true;
      this.selectState = 1;
    } else {
      newVal = false;
      this.selectState = 0;
    }
    for (let i = 0; i < this.itemAmount; i++) {
      this.colorState[i] = newVal;
    }
    let reactivityReset = { ...this.colorState };
    this.colorState = reactivityReset;
    this.scramble(false);
  }
  checkboxChange() {
    let checkboxCount = 0;
    for (let i = 0; i < this.itemAmount; i++) {
      if (this.colorState[i] == true) {
        checkboxCount++;
      } else {
        checkboxCount--;
      }
      if (checkboxCount == this.itemAmount) this.selectState = 1;
      if (checkboxCount == -this.itemAmount + 1) this.selectState = 0;
    }
  }
}
