<template>
  <div class="contacts-sidebar">
    <div class="flex items-center justify-between bg-gray-100 mb-2 p-6 rounded-b-xl " style="flex-basis: 100px;">
      <div class="flex">
        <div class="mr-4">
          <img :class="[`border-${getStateColor(user.state.title)}`]" class="hover:shadow-lg rounded-full border-2" src="@/assets/images/contacts-sidebar/user.png" />
        </div>
        <div class="flex flex-col items-start">
          <p class="font-semibold text-sm text-gray-200 mb-1">{{ user.username }}</p>
          <div @click="toggleUserStatePanel" class="relative flex items-center justify-between cursor-pointer px-2 bg-blue-100 rounded-full h-5 hover:shadow-lg" style="min-width: 73px;">
            <div :class="[`bg-${getStateColor(user.state.title)}`]" class="rounded-full w-2 h-2 mr-1"></div>
            <div class="capitalize text-gray-300 text-xxs mr-1">{{ user.state.title }}</div>
            <div>
              <img class="transform duration-300" :class="{ 'rotate-180': isUserStatePanelOpen }" src="@/assets/images/contacts-sidebar/open-profile-bar-arrow.svg" />
            </div>
            <transition name="fade">
              <div v-if="isUserStatePanelOpen" class="absolute inset-0 bg-blue-100 rounded-md" style="top: 1.5rem; height: 94px;">
                <div @click="changeUserState(userStateColor)" v-for="userStateColor in userStateColors" :key="userStateColor.state" class="flex items-center text-gray-300 hover:bg-purple-100 p-2 text-xxs border-b border-gray-300">
                  <div :class="[`bg-${userStateColor.color}`]" class="rounded-full w-2 h-2 mr-2"></div>
                  <p class="capitalize">{{ userStateColor.state }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div @click="toggleUserInfoPanel" class="w-8 h-8 flex justify-center items-center cursor-pointer">
        <img class="transition transform duration-300" :class="{ 'rotate-180': isMenuPanelOpen }" src="@/assets/images/contacts-sidebar/open-profile-bar-dots.svg" />
        <transition name="fade">
          <div v-if="isMenuPanelOpen" class="absolute left-0 bg-blue-100 rounded-md z-10" style="top: 100px; width: 350px;">
            <div v-for="menuLink in menuLinks" :key="menuLink" class="flex items-center text-gray-300 hover:text-white hover:bg-purple-100 p-2 text-xs border-b border-gray-300">
              <p class="capitalize">{{ menuLink }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="flex flex-col flex-1 bg-gray-100 rounded-t-xl pt-6 overflow-y-auto">
      <div class="flex flex-col flex-1 overflow-y-auto custom-scrollbar px-6">
        <div
          v-for="userConversation in userConversations"
          :key="userConversation.user_id"
          @click="changeActiveConversation(userConversation.user_id)"
          class="flex items-center justify-between rounded-xl px-3 py-4 cursor-pointer"
          :class="{ 'bg-blue-100': userConversation.user_id === activeConversationId }"
        >
          <div class="flex items-center">
            <div class="relative">
              <img class="mr-2 rounded-full border-2" :class="[`border-${getStateColor(userConversation.user_state)}`]" :src="require(`~/assets/images/users/${userConversation.user_image}.png`)" />
              <div :class="[`bg-${getStateColor(userConversation.user_state)}`]" class="absolute w-3 h-3 top-0 rounded-full border border-white" style="right: 0.625rem;"></div>
            </div>
            <div class="flex flex-col">
              <p class="font-semibold text-xs capitalize mb-1" :class="{ 'text-gray-400': userConversation.user_id === activeConversationId, 'text-gray-200': userConversation.user_id !== activeConversationId }">{{ userConversation.user_name }}</p>
              <p class="font-light text-xxs" :class="{ 'text-gray-300': userConversation.user_id === activeConversationId, 'text-gray-500': userConversation.user_id !== activeConversationId }">{{ userConversation.last_message }}</p>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-xxs mb-2" :class="{ 'text-gray-400': userConversation.user_id === activeConversationId, 'text-gray-500': userConversation.user_id !== activeConversationId }">20/20/2020</p>
            <div v-if="userConversation.unread_messages" class="flex">
              <div class="bg-green-100 w-2 h-2 rounded-full mr-1"></div>
              <div class="bg-green-100 w-2 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between border-t border-gray-600 px-6" style="flex-basis: 85px;">
        <div
          @click="changeActiveConversationsMenuLink(conversationsMenuLink)"
          class="flex-1 cursor-pointer rounded-lg"
          :class="{ 'border-b-2 border-blue-100': activeConversationsMenuLink === conversationsMenuLink }"
          v-for="conversationsMenuLink in conversationsMenuLinks"
          :key="conversationsMenuLink"
        >
          <img
            style="filter: invert(52%) sepia(73%) saturate(953%) hue-rotate(198deg) brightness(90%) contrast(92%);"
            :class="{ active: activeConversationsMenuLink === conversationsMenuLink }"
            class="conversations-menu-link mb-4"
            :src="require(`@/assets/images/conversations-menu/${conversationsMenuLink}.svg`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userStateColors from "@/content/userStateColors.json";
import menuLinks from "@/content/menuLinks.json";
import userConversations from "@/content/userConversations.json";
import conversationsMenuLinks from "@/content/conversationsMenuLinks.json";

export default {
  mounted() {
    this.activeConversationId = this.userConversations[0].user_id;
  },
  data() {
    return {
      activeConversationId: 0,
      activeConversationsMenuLink: "privates",
      user: {
        username: "Mehmet Revnaki",
        state: {
          title: "away"
        }
      },
      userStateColors,
      menuLinks,
      userConversations,
      conversationsMenuLinks
    };
  },
  computed: {
    isMenuPanelOpen() {
      return this.$store.state.layout.isMenuPanelOpen;
    },
    isUserStatePanelOpen() {
      return this.$store.state.layout.isUserStatePanelOpen;
    }
  },
  methods: {
    getStateColor(state) {
      return userStateColors.find(x => x.state === state).color;
    },
    toggleUserInfoPanel() {
      this.$store.dispatch("layout/toggleUserInfoPanel");
    },
    toggleUserStatePanel() {
      this.$store.dispatch("layout/toggleUserStatePanel");
    },
    changeUserState(state) {
      this.user.state.title = state.state;
    },
    changeActiveConversation(user_id) {
      this.activeConversationId = user_id;
    },
    changeActiveConversationsMenuLink(conversationsMenuLink) {
      this.activeConversationsMenuLink = conversationsMenuLink;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    @apply bg-purple-100;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    @apply bg-blue-100;
  }
}

.conversations-menu-link {
  @apply opacity-25 mx-auto;

  &.active {
    @apply opacity-100;
    filter: invert(52%) sepia(73%) saturate(953%) hue-rotate(198deg) brightness(90%) contrast(92%);
  }
}

.contacts-sidebar {
  @apply flex flex-col;

  flex-basis: 70px;

  @screen lg {
    flex-basis: 350px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
