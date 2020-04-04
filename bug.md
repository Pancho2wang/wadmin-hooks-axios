1、使用全局状态 hooks 时，组件不要使用函数式表达，要使用 dom 表达 比如：{SiderMenu({ routes, pathname, menuList })} 在 SiderMenu 组件中的 global state 会不及时更新 <SiderMenu {...{ routes, pathname, menuList }} />
