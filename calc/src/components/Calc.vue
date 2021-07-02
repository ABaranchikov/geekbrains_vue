<template>
  <div>
    <div>
      <input type="number" placeholder="op1" v-model.number="operand1" />
      <input type="number" placeholder="op2" v-model.number="operand2" />
      = {{ result }}
    </div>

    <div class="error" v-if="error">Ошибка: {{ error }}</div>

    <div class="buttons"></div>
    <button
      class="keyboard-btn"
      v-for="btn in buttons"
      :key="btn"
      @click="calculate(btn)"
    >
      {{ btn }}
    </button>
    <div class="keybord-show">
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">Отобразить экранную клавиатуру</label>
    </div>

    <div class="keyboard" v-if="checked">
      <button
        class="keyboard-btn"
        v-for="btn in collections"
        :key="btn"
        @click="addSymbol(btn)"
      >
        {{ btn }}
      </button>
      <button class="keyboard-btn" @click="removeSymbol">&#8592;</button>

      <div class="selectField">
        <input
          name="selectedField"
          type="radio"
          id="one"
          value="operand1"
          v-model="selectedField"
        />
        <label for="one">Операнд 1</label>

        <input
          name="selectedField"
          type="radio"
          id="two"
          value="operand2"
          v-model="selectedField"
        />
        <label for="two">Операнд 2</label>
        <span> Выбрано: {{ selectedField }} </span>
      </div>
    </div>

    <div class="logs">{{ logs }}</div>
  </div>
</template>

<script>
export default {
  name: "Calc",
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
    error: "",
    selectedField: "operand1",
    buttons: ["+", "-", "*", "/", "^"],
    collections: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    checked: false,
    logs: {},
  }),
  methods: {
    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.add();
          break;
        case "-":
          this.substract();
          break;
        case "*":
          this.mult();
          break;
        case "/":
          this.div();
          break;
        case "^":
          this.pow();
          break;
      }
      const key = Date.now();
      const value = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      this.$set(this.logs, key, value);
    },
    add() {
      this.result = this.operand1 + this.operand2;
    },
    substract() {
      this.result = this.operand1 - this.operand2;
    },
    div() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "На 0 делить нельзя!!!";
      } else {
        this.result = operand1 / operand2;
      }
    },
    mult() {
      this.result = this.operand1 * this.operand2;
    },
    pow() {
      this.result = Math.pow(this.operand1, this.operand2);
    },
    addSymbol(s) {
      if (this[this.selectedField] === 0) {
        this[this.selectedField] = +s;
      } else {
        this[this.selectedField] = parseInt(this[this.selectedField] + s);
      }
    },
    removeSymbol() {
      if (this[this.selectedField] < 10) {
        this[this.selectedField] = 0;
      } else {
        this[this.selectedField] = parseInt(
          ("" + this[this.selectedField]).slice(0, -1)
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.buttons {
  padding: 5px 0;
}
.keybord-show {
  padding: 10px 0;
}
.keyboard {
  padding: 10px 0;
}
.keyboard-btn {
  margin: 0 5px;
}
.selectField {
  padding: 10px 0;
}
</style>