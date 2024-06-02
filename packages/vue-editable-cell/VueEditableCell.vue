<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip
        v-if="!editMode && !showInput"
        :placement="toolTipPlacement"
        :open-delay="toolTipDelay"
        :content="toolTipContent"
    >
      <div tabindex="0" @keyup.enter="onFieldClick">
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    <component
        :is="editableComponent"
        v-if="editMode || showInput"
        ref="input"
        @focus="onFieldClick"
        @keyup.enter.native="onInputExit"
        v-on="listeners"
        v-bind="$attrs"
        v-model="model"
        clearable
        :multiple="multiple"
        :placeholder="placeholder"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Element.install(Vue)
Vue.use(Element, {size: 'small', zIndex: 3000})

export default {
  name: 'VueEditableCell',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    toolTipContent: {
      type: String,
      default: '点击编辑',
    },
    toolTipDelay: {
      type: Number,
      default: 500,
    },
    toolTipPlacement: {
      type: String,
      default: 'top-start',
    },
    placeholder: {
      type: String,
      default: '',
    },
    showInput: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    editableComponent: {
      type: String,
      default: 'el-input',
    },
    closeEvent: {
      type: String,
      default: 'blur',
    },
    editable: {
      type: String,
      default: 'true',
    },
  },
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners,
      }
    },
  },
  methods: {
    onFieldClick() {
      if (this.editable === 'true') {
        this.editMode = true
        this.$nextTick(() => {
          let inputRef = this.$refs.input
          if (inputRef) {
            inputRef.focus()
          }
        })
      }
    },
    onInputExit() {
      this.editMode = false
    },
    onInputChange(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style scoped>
::v-deep .el-select .el-input {
  width: 130px;
}

::v-deep .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.request-url {
  margin-top: 16px;
}

.request-content {
  margin-top: 16px;
}

.response-content {
  margin-top: 16px;
}

</style>
