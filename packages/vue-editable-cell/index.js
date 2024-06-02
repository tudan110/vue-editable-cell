// 引入组件
import VueEditableCell from './VueEditableCell.vue'

// 为组件提供 install 安装方法，供按需引入
VueEditableCell.install = (Vue) => {
    Vue.component(VueEditableCell.name, VueEditableCell)
}

// 导出组件
export default VueEditableCell
