import { h, render } from 'vue';
import Alert from '../components/Alert.vue';

/**
 * message：提示显示的文字
 * onConfirm：确认回调
 * onCancel：返回回调
 * showClose：默认不显示右上角删除图标
 * btnLabel: 自定义按钮文字，默认Yes/No
 * showCancelBtn: 默认显示No按钮
 **/
export function ShowAlert(message: string, icon: number = 0) {
  const vNode = h(Alert, { message, icon, close: closeHandler }, {});

  const container = document.createElement('div');
  document.body.appendChild(container);
  render(vNode, container);

  function closeHandler() {
    document.body.removeChild(container);
  }
}
