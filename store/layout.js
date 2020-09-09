export const state = () => ({
  isContactInfoSidebarOpen: false,
  isMenuPanelOpen: false,
  isUserStatePanelOpen: false
});

export const mutations = {
  toggleContactInfoSidebar(state) {
    state.isContactInfoSidebarOpen = !state.isContactInfoSidebarOpen;
  },
  toggleUserInfoPanel(state) {
    state.isMenuPanelOpen = !state.isMenuPanelOpen;
  },
  toggleUserStatePanel(state) {
    state.isUserStatePanelOpen = !state.isUserStatePanelOpen;
  }
};

export const actions = {
  toggleUserInfoPanel({ commit, state }) {
    commit("toggleUserInfoPanel");
    if (state.isUserStatePanelOpen) commit("toggleUserStatePanel");
  },
  toggleUserStatePanel({ commit, state }) {
    commit("toggleUserStatePanel");
    if (state.isMenuPanelOpen) commit("toggleUserInfoPanel");
  }
};
