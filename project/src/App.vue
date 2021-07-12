<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
      <main>
        <div>
          <AddPayment @addNewPayment="addData" :categories="categories" />
        </div>

        <CategorySelect
          @addNewCategory="addCategory"
          :categories="categories"
        />

        <PaymentsDisplay :list="paymentsList" />
        <Pagination
          @changePage="changePage"
          :pageCount="pageCount"
          :activePage="activePage"
        />
      </main>
    </header>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";
import CategorySelect from "./components/CategorySelect.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination,
    CategorySelect,
  },

  methods: {
    ...mapMutations(["setPaymentListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData", "fetchCategory", "addCategoryToList"]),
    addData(data) {
      //this.paymentsList.push(data);
      // this.paymentsList = [...this.paymentsList, data];
      this.addDataToPaymentsList(data);
    },
    addCategory(data) {
      console.log("addCategory = " + data);
      this.addCategoryToList(data);
    },
    changePage(page) {
      console.log("Page = " + page);
      this.fetchData(page);
    },
  },

  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
      pageCount: "getPageCount",
      activePage: "getActivePage",
    }),
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
    //paymentsList() {
    // return this.$store.getters.getPaymentList;
    // },
  },

  created() {
    //this.paymentsList = this.fetchData();
    //this.$store.commit("setPaymentListData", this.fetchData()); //mutation
    //  this.setPaymentListData(this.fetchData());
    // this.$store.dispatch("fetchData"); //action
    this.fetchData("page1");
    if (!this.categories.length) {
      this.fetchCategory();
    }
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
