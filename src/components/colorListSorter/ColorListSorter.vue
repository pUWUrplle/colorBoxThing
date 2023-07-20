<template>
  <div class="pageContainer">
    <div class="formContainer">
      <div v-for="(colorList, index) in colorListArray">
        <div class="listColumb">
          <div class="titleRow">
            <input
              type="checkbox"
              @click="colorList.nonbinaryCheckboxChange()"
            />
            <div>list {{ index + 1 }}</div>
          </div>
          <div class="colorItemRow" v-for="item in colorList.itemAmount">
            <div class="subRow">
              <input type="checkbox" v-model="colorList.colorState[item - 1]" />
              <div>list {{ item }}</div>
            </div>
            <div class="subRow">
              <input
                type="number"
                class="invisibleInput"
                v-model="colorList.colorCount[item - 1]"
              />
              <input
                class="squareColorSelector"
                type="color"
                v-model="colorList.colorArray[item - 1]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formContainer">
      <div class="sortContainer" v-for="(colorList, index) in colorListArray">
        <div class="titleRow">
          <div>list {{ index + 1 }}</div>
          <button @click="colorList.scramble()" class="shuffleButton">
            перемешать
          </button>
        </div>
        <div
          class="colorBoxRow"
          v-if="
            !colorList.scrambleState &&
            parseInt(colorList.colorCount[item - 1]) &&
            colorList.colorCount[item - 1] > 0 &&
            colorList.colorState[item - 1] == true
          "
          v-for="item in colorList.itemAmount"
        >
          <div v-for="colorBox in colorList.colorCount[item - 1]">
            <div
              @click="colorList.decColorCount(item - 1)"
              class="colorBox"
              :style="{ 'background-color': colorList.colorArray[item - 1] }"
            ></div>
          </div>
        </div>
        <div class="colorBoxRow" v-if="colorList.scrambleState">
          <div v-for="(item, index) in colorList.scrambledArray">
            <div
              class="colorBox"
              @click="colorList.decSortedColor(index)"
              :style="{ 'background-color': colorList.colorArray[item] }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorList from "./colorList.js";
export default {
  name: "ColorListSorter",
  props: {},
  data: () => ({
    colorListArray: [new colorList(), new colorList(), new colorList()],
  }),
};
</script>

<style scoped lang="scss">
//some of this can be replaced with bootstrap
.pageContainer {
  border: 1px solid black;
  padding: 15px;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 30px;
}
@media (max-width: 1200px) {
  .pageContainer {
    border: 1px solid black;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
.titleRow {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  gap: 5px;
  align-self: flex-start;
}
.formContainer {
  border: 1px solid black;
  width: 500px;
  padding: 15px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 15px;
  min-height: 600px;
}
.sortContainer {
  border: 1px solid black;
  max-width: 600px;
  padding: 15px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.squareColorSelector {
  width: 20px;
  height: 20px;
  margin: none;
  padding: none;
  border: none;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
}
.colorItemRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 400px;
  margin-left: 40px;
  .subRow {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 10px;
  }
}
.listColumb {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.invisibleInput {
  border: none;
  max-width: 50px;
  text-align: right;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    outline: none;
  }
}
.colorBox {
  width: 20px;
  height: 20px;
}
.colorBoxRow {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  gap: 2px;
  padding: 4px;
}
.titleRow {
  display: flex;
  justify-content: space-between;
}
.shuffleButton {
  background-color: #1a7dff;
  border-radius: 5px;
  border: solid #1a7dff;
  color: white;
}
.test {
  background-color: pink;
  height: 20px;
}
</style>
