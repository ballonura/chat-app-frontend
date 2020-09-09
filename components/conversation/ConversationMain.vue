<template>
  <div class="flex-1" @click="toggleContactInfoSidebar">2</div>
</template>

<script>
export default {
  methods: {
    toggleContactInfoSidebar() {
      this.$store.commit("layout/toggleContactInfoSidebar");
    }
  }
};
</script>

<style style="scss" scoped></style>
