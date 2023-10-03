
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = user;
    },
  },
  persist: true,
});
