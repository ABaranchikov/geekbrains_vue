<template>
  <div class="wrapper">
    <div class="header">
      <p>{{ settings.header }}</p>
    </div>
    <div class="content">
      <component
        :is="settings.name"
        :property="settings"
        @updatePayment="updatePayment"
        @addNewCategory="addCategory"
      />
    </div>
    <div class="footer">
      <button class="close-btn" @click="$modal.hide()">Close</button>
    </div>
  </div>
</template>

<script>
import AddPayment from "./AddPayment.vue";
import UpdatePayment from "./UpdatePayment.vue";
import CategorySelect from "./AddCategory.vue";
export default {
  components: { AddPayment, UpdatePayment, CategorySelect },
  props: {
    settings: Object,
  },
  methods: {
    updatePayment(data) {
      console.log("updatePayment");
      console.log(data);

      this.$store.commit("updateData", data);
    },
    addCategory(data) {
      console.log("addCategory = " + data);
      this.$store.commit("updateCategory", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  width: 350px;
  top: 10px;
  left: 100px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
}
.header {
  background: #cfe0e8;
  height: 40px;
}
.header p {
  margin: 0;
  padding: 5px;
  font-size: 20px;
  text-align: left;
  font-weight: 800;
}
.footer {
  background: #cfe0e8;
  display: flex;
  justify-content: flex-end;
}
.close-btn {
  width: 100px;
  font-size: 18px;
  background: #f1e3dd;
  color: #000;
  padding: 5px;
  margin: 10px 5px;
}
</style>