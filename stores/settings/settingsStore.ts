import { defineStore } from 'pinia';
import api from '../../api/request';
import { Settings } from '../../constant/Service';
import { SaveTemplateInfo } from '../../vo';

interface settingsState {
  getValidateNoticeResult: any;
  addNewNoticeResult: any;
  getAllTypeResult: any;
  deleteNoticeResult: any;
  getMenuTemplateResult: any;
  addTemplateResult: any;
  deleteMenuTemplateResult: any;
}

interface settingsAction {
  getValidateNotice(param: any): void;
  addNewNotice(param: any): void;
  getAllType(param: any): void;
  deleteNotice(param: any): void;
  getValidateMenuTemplate(param: any): void;
  addTemplate(param: SaveTemplateInfo): void;
  deleteMenuTemplate(param: string): void;
}

export const useSettingsStore = defineStore<string, settingsState, any, settingsAction>({
  id: 'settingsStore',
  state: () => ({
    getValidateNoticeResult: null,
    addNewNoticeResult: null,
    getAllTypeResult: null,
    deleteNoticeResult: null,
    getMenuTemplateResult: null,
    addTemplateResult: null,
    deleteMenuTemplateResult: null,
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
    async getValidateMenuTemplate(param: any) {
      await api
        .get(Settings.GetValidateMenuTemplate, param)
        .then((res: any) => {
          this.getMenuTemplateResult = res;
        })
        .catch(() => {
          this.getMenuTemplateResult = null;
        });
    },
    async addTemplate(param: SaveTemplateInfo) {
      await api
        .get(Settings.AddTemplate, param)
        .then((res: any) => {
          this.addTemplateResult = res;
        })
        .catch(() => {
          this.addTemplateResult = null;
        });
    },
    async deleteMenuTemplate(param: string) {
      await api
        .get(Settings.DeleteMenuTemplate, param)
        .then((res: any) => {
          this.deleteMenuTemplateResult = res;
        })
        .catch(() => {
          this.deleteMenuTemplateResult = null;
        });
    },
  },
});
