# docs-table

## 介绍

模拟移动端 excel 表格，批量选中，修改数据的轮子

## 功能

- 单个选中
- 当前行/列选中

## Todo

- 可自由上下跨行选中
- 可输入内容，填充到表格
## 常见/迁移写法

- v-model

	v2: props: value
	v3: props: modelValue

- 数据更新但是视图没更新

	使用拓展运算符拓展对象时，要保持对象的关联采用toRefs
## 遇到的问题

- 保存代码的格式与 eslint 不一致，报错

  默认 vscode 会对某种语言格式化支持，比如 vue，装了插件后，保存/格式化的时候会自动帮你格式化了，所以导致格式与 eslint 不一致

  ```js
	"[vue]": {
		"editor.defaultFormatter": "octref.vetur"
	}
  ```

- 同上，保存的时候不能按 eslint 配置格式化代码

	因为之前上传了vscode的配置，每次格式化都要拉去eslint的配置格式化代码，然后被我关掉了。。以至于不生效，右下角可以重新打开
## 参考链接

- [Vue Class Component](https://class-component.vuejs.org/guide/installation.html#manual-setup)
- [Configuration Reference](https://cli.vuejs.org/config/)
