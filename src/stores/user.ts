import { defineStore, acceptHMRUpdate } from "pinia";
import type { Notification, User } from "~/types";

export const useStore = defineStore("state", () => {
  const state = reactive({
    notifications: [] as Notification[],
    user: undefined as User | undefined,
    token: undefined as string | undefined,
  });

  const setState = (newState: any) => {
    Object.assign(state, newState);
  };

  const notify = (message: string, status: string) => {
    state.notifications.push({ message, status });
  };

  return {
    state,
    notify,
    setState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
