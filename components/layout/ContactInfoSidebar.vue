<template>
  <transition name="fade">
    <div class="contact-info-sidebar" v-if="isContactInfoSidebarOpen">
      3
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isContactInfoSidebarOpen() {
      return this.$store.state.layout.isContactInfoSidebarOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-info-sidebar {
  flex-basis: 100%;

  @screen lg {
    flex-basis: 350px;
  }
}
</style>
