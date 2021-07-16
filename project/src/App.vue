<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>

      <div>
        <ul :class="[$style.menu]">
          <li :class="[$style.menu_item]">
            <router-link to="/add/payment/Food?value=100">Food</router-link>
          </li>
          <li :class="[$style.menu_item]">
            <router-link to="/add/payment/Sport?value=200">Sport</router-link>
          </li>
          <li :class="[$style.menu_item]">
            <router-link to="/add/payment/Education?value=500"
              >Education</router-link
            >
          </li>
          <li :class="[$style.menu_item]">
            <router-link to="/add/payment/">Other</router-link>
          </li>
        </ul>
      </div>

      <main>
        <div class="content-page">
          <router-view @addNewPayment="addData" />
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
        <transition name="fade">
          <modal-window v-if="modalSettings.name" :settings="modalSettings" />
        </transition>

        <button @click="showPaymentForm">Open/Hide</button>
      </main>
    </header>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import CategorySelect from "./components/CategorySelect.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";
import Pagination from "./components/Pagination.vue";
//import ModalWindow from "./components/ModalWindow.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    // AddPayment,
    Pagination,
    CategorySelect,

    ModalWindow: () =>
      import(
        /*webpackChunkName; 'ModalWindow'*/ "./components/ModalWindow.vue"
      ),
  },
  data() {
    return {
      page: "",
      modalShow: false,
      modalSettings: {},
    };
  },
  methods: {
    ...mapMutations([
      "setPaymentListData",
      "addDataToPaymentsList",
      "updateCategory",
    ]),
    ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      console.log("addData");
      //this.addDataToPayments(data);
      this.addDataToPaymentsList(data);
    },
    addCategory(data) {
      console.log("addCategory = " + data);
      this.updateCategory(data);
    },
    changePage(page) {
      console.log("Page = " + page);
      this.fetchData(page);
    },

    //modal
    onShow(settings) {
      this.modalSettings = settings;
      console.log(settings);
    },
    onHide() {
      this.modalSettings = {};
    },

    showPaymentForm() {
      this.$modal.show("AddPayment", { header: "ADD" });
    },
  },

  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
      pageCount: "getPageCount",
      activePage: "getActivePage",
    }),
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
    this.$modal.EventBus.$on("shown", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
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
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss" module>
html,
body,
.app {
  width: 100%;
  height: 100vh;
}
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

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;

  display: flex; /*Размещаем список горизонтально для реализации меню*/
}

.menu_item a {
  font-size: 26px;
  color: #008b8b;
  text-decoration: none; /*убираем подчеркивание текста ссылок*/
}
.menu_item {
  margin-right: 10px; /*Добавляем отступ у пунктов меню*/
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
