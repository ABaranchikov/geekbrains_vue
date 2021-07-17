<template>
  <div>
    <a class="link" href="#" @click="onClick">Удалить</a>
  </div>
</template>

<script>
export default {
  name: "DeletePayment",
  props: {
    property: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onClick() {
      const data = this.property;
      this.$emit("deleteItem", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #000;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>