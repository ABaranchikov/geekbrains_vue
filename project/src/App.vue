<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
      <div class="menu">
        <router-link to="/dashboard">Dashboard</router-link> /
        <router-link to="/about">About</router-link>/
        <!--
        <router-link to="/notfound">NotFound</router-link>
-->
        <button @click="goToPageNotFound">Not found</button>
        <!--
        <a href="dashboard">Dashboard</a> / <a href="about">About</a> /
        <a href="notfound">Not Found</a>
        -->
      </div>
      <main>
        <div class="content-page">
          <router-view />
          <!--
          <About v-if="page === 'about'" />
          <Dashboard v-if="page === 'dashboard'" />
          <NotFound v-if="page === 'notfound'" />
          -->
        </div>
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
/*
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import Dashboard from "./views/Dashboard.vue";
*/
export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination,
    CategorySelect,
    //  About,
    //  NotFound,
    // Dashboard,
  },
  data() {
    return {
      page: "",
    };
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
    /*
    setMenuPage() {
      //навигация через hash
      //this.page = location.hash.slice(1);
      this.page = location.pathname.slice(1);
    },
    
    */
    goToPageNotFound() {
      this.$router.push({
        name: "NotFound",
      });
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

  mounted() {
    /*
    //навигация через hash
    this.setMenuPage();
    window.addEventListener("hashchange", () => {
      this.setMenuPage();
    });
    */
    /*
   //через историю
    this.setMenuPage();
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState({}, "", link.href);
        this.setMenuPage();
      });
    });
    window.addEventListener("popstate", this.setMenuPage);
    */
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
