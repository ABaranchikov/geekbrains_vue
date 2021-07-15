<template>
  <div>
    <div class="addData">
      <input class="inputData" v-model="date" placeholder="date" />
      <select class="inputData" v-model="selected">
        <option value="" disabled selected>Choose category...</option>
        <option v-for="(option, idx) in getCategories" :key="idx">
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
  props: {},
  data: () => ({
    date: "",
    category: "",
    value: null,
    selected: "",
  }),
  methods: {
    fetchData() {
      const category = this.$route.params.category;
      if (category != undefined) {
        this.selected = category;
      } else {
        this.selected = "";
      }
      this.date = this.getCurrentDate;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      this.value = params["value"];
    },

    onClick() {
      const data = {
        data: this.data || this.getCurrentDate,
        category: this.selected,
        value: this.value,
      };
      console.log("add", data);
      this.$emit("addNewPayment", data, "true");
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      let d = today.getDate();
      if (d < 10) {
        d = "0" + d;
      }
      let m = today.getMonth() + 1;
      if (m < 10) {
        m = "0" + m;
      }
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    getCategories() {
      return this.$store.getters.getCategoryList;
    },
  },
  created() {
    // загружаем данные, когда представление создано
    // и данные реактивно отслеживаются
    this.fetchData();
  },
  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: "fetchData",
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