import { defineStore } from 'pinia';
import api from '../../api/request';
import { Settings } from '../../constant/Service';

interface analysisState {
  userListResult: any;
  getUserOnlineTimeResult: any;
}

interface analysisAction {
  getUserList(param: any): void;
  getUserOnlineTime(param: any): void;
}

export const analysisStore = defineStore<string, analysisState, any, analysisAction>({
  id: 'analysisStore',
  state: () => ({
    userListResult: null,
    getUserOnlineTimeResult: null,
  }),
  actions: {
    async getUserList(param: any) {
      await api
        .get(Settings.GetUserList, param)
        .then((res: any) => {
          this.userListResult = res;
        })
        .catch(() => {
          this.userListResult = null;
        });
    },
    async getUserOnlineTime(param: any) {
      await api
        .get(Settings.GetUserOnlineTime, param)
        .then((res: any) => {
          this.getUserOnlineTimeResult = res;
        })
        .catch(() => {
          this.getUserOnlineTimeResult = null;
        });
    },
  },
});
