import { defineStore } from "pinia";
import { getId } from "@/plugins/getId";

export const usersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    addUser(user) {
      const id = getId(this.users.map(u=>u.id));
      this.users.push({ ...user, id });
    },
    deleteUser(id) {
      const index = this.users.findIndex((u) => u.id == id);
      this.users.splice(index, 1);
    },
    editUser(user) {
      const index = this.users.findIndex((u) => u.id == user.id);
      this.users[index][user.type] = user.value;
    },
  },
});
