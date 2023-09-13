import { defineStore } from 'pinia';
import api from '../../api/request';
import { Settings } from '../../constant/Service';
import { ShowAlert } from '../../components/Alert';

interface JtracState {
  jtracStatsList: any;
  jtracChartHeads: any;
  jtracChartData: any;
  jtracGridsData: any;
  dayList: any;
  mark?: string;
  type: string;
  selectUser?: any;
  userListResult: any;
  headerGridWidth?: any;
  headerDivWidth?: any;
}

interface JtracAction {
  getJtracStatsList(param: any): void;
  getUserList(param: any): void;
}

export const useJtracSubViewStore = defineStore<string, JtracState, any, JtracAction>({
  id: 'jtracSubViewStore',
  state: () => ({
    jtracStatsList: null,
    jtracChartHeads: null,
    jtracChartData: null,
    jtracGridsData: null,
    dayList: null,
    selectUser: null,
    type: '',
    userListResult: null,
    mark: '',
    headerGridWidth: '100%',
    headerDivWidth: 'display: flex; margin-top:5px;',
  }),
  actions: {
    async getJtracStatsList(param: any) {
      await api
        .get(Settings.GetJtracStatsList, param)
        .then((res: any) => {
          this.mark = 'getJtracStatsList';
          this.jtracChartHeads = null;
          this.jtracChartData = null;
          this.jtracGridsData = null;
          this.jtracStatsList = res.data;
          const list = JSON.parse(JSON.stringify(res.data));
          const dates = JSON.parse(JSON.stringify(this.dayList));
          if (res.data.length < 1) {
            ShowAlert('无检索结果!', 1);
            return;
          }
          let chartHead: any = [];
          let chart: any = [];
          let grids: any = [];

          list?.forEach((elem: any, index: number) => {
            if (this.type === 'A' && this.selectUser?.length > 0 && !this.selectUser?.some(s => s === elem.type)) return;
            const headInfo = chartHeadData(elem, this.type);
            chartHead.push(headInfo); //图表表头
            let info: any = {};
            info.name = headInfo.name;
            info.id = elem.type;
            grids.push(gridsData(info, elem.jtracList)); //表格数据
          });
          if (this.type === 'A' && chartHead.length === 0) {
            ShowAlert('无检索结果!', 1);
            return;
          }
          //处理图表数据
          dates?.forEach(ele => {
            const gridInfo: any = {};
            gridInfo.name = ele.name;
            chart.push(chartData(gridInfo, this.type, this.selectUser));
          });

          //处理图表表头数据
          function chartHeadData(data: any, type: string) {
            const info: any = {};
            const strategies = {
              A: function () {
                info.name = '待上传';
                info.yName = 'typeA';
                return info;
              },
              B: function () {
                info.name = '已传45';
                info.yName = 'typeB';
                return info;
              },
              C: function () {
                info.name = '已传IDC';
                info.yName = 'typeC';
                return info;
              },
              R: function () {
                info.name = '待检查';
                info.yName = 'typeR';
                return info;
              },
              name: function () {
                info.name = data.name;
                info.yName = `type${data.type}`;
                console.log();
                return info;
              },
              systems: function () {
                info.name = data.name;
                info.yName = `type${data.type}`;
                return info;
              },
            };
            switch (type) {
              case 'A':
                return strategies['name']();
              case 'B':
                return strategies[data.type]();
              case 'C':
                return strategies['systems']();
            }
          }

          //处理表格数据
          function gridsData(info: any, List: any) {
            dates.forEach((i: any, index: number) => {
              info['date' + index] = 0;
              List.forEach((data: any, jtracIndex: number) => {
                if (i.name === data.date) {
                  info['date' + index] = data.totalCount;
                }
              });
            });
            return info;
          }

          //处理图表数据
          function chartData(info: any, type: string, selectUser: any) {
            list?.forEach(elem => {
              if (type === 'A' && selectUser?.length > 0 && !selectUser?.some(s => s === elem.type)) return;
              info[`type${elem.type}`] = 0;
              elem?.jtracList.forEach(data => {
                if (info.name === data.date) {
                  info[`type${elem.type}`] = data.totalCount;
                }
              });
            });
            return info;
          }

          //处理宽度

          if (chart.length > 0) {
            this.headerGridWidth = (chart.length + 1) * 120 + 10 + 'px';
            this.headerDivWidth = 'margin-top:5px;width:' + ((chart.length + 1) * 120 + 10) + 'px;';
          } else {
            this.headerGridWidth = '100%';

            this.headerDivWidth = 'display: flex;margin-top:5px;';
          }

          this.jtracChartHeads = chartHead;
          this.jtracChartData = chart;
          this.dayList.unshift({ name: '', file: 'name' });
          this.jtracGridsData = grids;
        })
        .catch((error: any) => {
          this.mark = 'getJtracStatsList';
          this.jtracStatsList = { error: true, msg: '网络错误!', data: error };
          ShowAlert('网络错误!');
        });
    },
    async getUserList(param: any) {
      await api
        .get(Settings.GetUserList, param)
        .then((res: any) => {
          this.userListResult = res.data;
        })
        .catch((error: any) => {
          this.mark = 'getUserList';
          this.userListResult = { error: true, msg: '网络错误!', data: error };
          ShowAlert('网络错误!');
        });
    },
  },
});
