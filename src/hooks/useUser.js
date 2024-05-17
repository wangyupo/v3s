// user 共用方法&参数
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

export function useUser() {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  return {
    userStore,
    userInfo,
  };
}
