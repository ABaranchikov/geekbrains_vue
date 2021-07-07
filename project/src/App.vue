<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
      <main>
        <div>
          <AddPayment @addNewPayment="addData" />
        </div>
        <PaymentsDisplay :list="paymentsList" />
      </main>
    </header>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
  },
  data: () => ({
    paymentsList: [],
  }),
  methods: {
    addData(data) {
      //this.paymentsList.push(data);
      this.paymentsList = [...this.paymentsList, data];
    },

    fetchData() {
      return [
        {
          data: "28.03.2021",
          category: "Food",
          value: 169,
        },
        {
          data: "21.03.2021",
          category: "Sport",
          value: 400,
        },
        {
          data: "30.03.2021",
          category: "Internet",
          value: 500,
        },

        {
          data: "01.04.2021",
          category: "Food",
          value: 1800,
        },
        {
          data: "02.04.2021",
          category: "Petrol",
          value: 2500,
        },
        {
          data: "03.04.2021",
          category: "Housing",
          value: 1500,
        },
        {
          data: "04.04.2021",
          category: "Clothing",
          value: 10000,
        },
        {
          data: "05.04.2021",
          category: "Food",
          value: 3860,
        },
        {
          data: "06.04.2021",
          category: "Housing",
          value: 800,
        },
        {
          data: "07.04.2021",
          category: "Food",
          value: 1800,
        },
      ];
    },
  },

  created() {
    this.paymentsList = this.fetchData();
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  background: #fff;
}
</style>
