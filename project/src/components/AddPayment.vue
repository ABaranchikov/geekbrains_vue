<template>
  <div>
    <button class="addCost" @click="show = !show">add new cost +</button>
    <div v-show="show" class="addData">
      <input class="inputData" v-model="date" placeholder="date" />
      <select class="inputData" v-model="selected">
        <option value="" disabled selected>Choose category...</option>
        <option v-for="(option, idx) in categories" :key="idx">
          {{ option }}
        </option>
      </select>

      <input
        class="inputData"
        v-model.number="value"
        type="number"
        placeholder="value"
      />
      <button class="addDataButton" @click="onClick">Add +</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    date: "",
    category: "",
    value: null,
    show: false,
    selected: "",
  }),
  methods: {
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.data || this.getCurrentDate,
        category,
        value,
      };
      console.log("add", data);
      this.$emit("addNewPayment", data, "true");
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
};
</script>

<style  lang="scss" scoped>
.addCost {
  width: 150px;
  background: #008b8b;
  color: #fff;
  text-transform: uppercase;
  padding: 10px;
  margin: 10px 0;
}
.addData {
  display: flex;
  flex-direction: column;
  width: 25%;
}
.inputData {
  text-transform: capitalize;
  padding: 15px 5px;
  margin: 5px 0;
  border: 1px solid #dddddd;
}
.addDataButton {
  width: 150px;
  background: #008b8b;
  color: #fff;
  text-transform: uppercase;
  padding: 10px;
  align-self: flex-end;
  margin: 10px 0;
}
</style>