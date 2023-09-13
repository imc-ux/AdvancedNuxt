import { defineStore } from 'pinia';
import api from '../../api/request';
import { Settings } from '../../constant/Service';

interface settingsState {
  getValidateNoticeResult: any;
  addNewNoticeResult: any;
  getAllTypeResult: any;
  deleteNoticeResult: any;
}

interface settingsAction {
  getValidateNotice(param: any): void;
  addNewNotice(param: any): void;
  getAllType(param: any): void;
  deleteNotice(param: any): void;
}

export const useSettingsStore = defineStore<string, settingsState, any, settingsAction>({
  id: 'settingsStore',
  state: () => ({
    getValidateNoticeResult: null,
    addNewNoticeResult: null,
    getAllTypeResult: null,
    deleteNoticeResult: null,
  }),
  actions: {
    async getValidateNotice(param: any) {
      await api
        .get(Settings.GetValidateNotice, param)
        .then((res: any) => {
          this.getValidateNoticeResult = res;
        })
        .catch(() => {
          this.getValidateNoticeResult = null;
        });
    },
    async addNewNotice(param: any) {
      await api
        .get(Settings.AddNewNotice, param)
        .then((res: any) => {
          this.addNewNoticeResult = res;
        })
        .catch(() => {
          this.addNewNoticeResult = null;
        });
    },
    async getAllType(param: any) {
      await api
        .get(Settings.GetAllType, param)
        .then((res: any) => {
          this.getAllTypeResult = res;
        })
        .catch(() => {
          this.getAllTypeResult = null;
        });
    },
    async deleteNotice(param: any) {
      await api
        .get(Settings.DeleteNotice, param)
        .then((res: any) => {
          this.deleteNoticeResult = res;
        })
        .catch(() => {
          this.deleteNoticeResult = null;
        });
    },
  },
});
