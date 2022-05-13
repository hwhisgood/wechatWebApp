import { defineStore } from "pinia";
import { setToken, removeToken } from "@/utils/auth";
import $api from "@/api";

export const useUserStore = defineStore({
  id: "userInfo",
  state: () => ({
    token: null,
    loginInfo: {},
    userId: null,
    userName: null,
    avatar: null,
    nickName: null,
  }),
  actions: {
    Login: function (userInfo) {
      return new Promise((resolve, reject) => {
        $api.system
          .login(userInfo)
          .then((res) => {
            setToken(res.token);
            this.token = res.token;
            this.loginInfo = res.data;
            this.userId = { res };
            this.userName = { res };
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // GetInfo: function () {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(res => {
    //       this.avatar = res.data.avatar;
    //       this.userId = res.data.userId;
    //       this.userName = res.data.userName;
    //       this.nickName = res.data.nickName;
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    LogOut: function () {
      return new Promise((resolve, reject) => {
        // logout().then(() => {
        this.token = "";
        removeToken();
        resolve();
        // }).catch(error => {
        //   reject(error)
        // })
      });
    },
  },
});
