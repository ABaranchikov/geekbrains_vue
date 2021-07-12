<template>
  <div>
    <input v-model="newCategory" placeholder="add new category" />
    <button @click="onClick">Add category</button>
    <select v-model="selected">
      <option v-for="(option, idx) in categories" :key="idx">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: "",
      newCategory: "",
    };
  },
  methods: {
    onClick() {
      const data = this.newCategory;
      this.$emit("addNewCategory", data, "true");
    },
  },
};
</script>

<style>
</style>