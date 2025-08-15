import { defineStore } from 'pinia';
import api from '../../api/request';
import { Settings } from '../../constant/Service';

interface statisticState {
  userListResult: any;
  getUserOnlineTimeResult: any;
  getJtracStatsListResult: any;
}

interface statisticAction {
  getUserList(param: any): void;
  getUserOnlineTime(param: any): void;
  getJtracStatsList(param: any): void;
}

export const useStatisticStore = defineStore<string, statisticState, any, statisticAction>({
  id: 'statisticStore',
  state: () => ({
    userListResult: null,
    getUserOnlineTimeResult: null,
    getJtracStatsListResult: null,
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
    async getJtracStatsList(param: any) {
      await api
        .get(Settings.GetJtracStatsList, param)
        .then((res: any) => {
          this.getJtracStatsListResult = res;
        })
        .catch(() => {
          this.getJtracStatsListResult = null;
        });
    },
  },
});
