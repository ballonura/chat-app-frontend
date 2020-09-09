<template>
  <div class="h-screen flex">
    <contacts-sidebar></contacts-sidebar>
    <div class="flex flex-1">
      <conversation-main></conversation-main>
      <contact-info-sidebar></contact-info-sidebar>
    </div>
  </div>
</template>

<script>
import ConversationMain from "@/components/conversation/ConversationMain";
import ContactsSidebar from "@/components/layout/ContactsSidebar";
import ContactInfoSidebar from "@/components/layout/ContactInfoSidebar";

export default {
  components: {
    ConversationMain,
    ContactsSidebar,
    ContactInfoSidebar
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
