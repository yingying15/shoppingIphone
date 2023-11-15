// 因为会在不同的页面用到不同的方法 所以应该用按需导出
// 定义常量 存入本地的键
// 用户信息权证
export const INFO_VEL = 'hm_shooping_info'
// 搜索历史记录
export const INFO_HISTORY = 'hm_history_info'
// 购物车数量
export const INFO_CARTNUM = 'hm_cartnum_info'
// 定义获取方法
export const getInfo = () => {
  // 从本地获取
  const obj = localStorage.getItem(INFO_VEL)
  // 如果本地没有的话 返回默认的
  return obj ? JSON.parse(obj) : { token: '', userId: '' }
}
// 定义设置方法
export const setInfo = (userInfo) => {
  localStorage.setItem(INFO_VEL, JSON.stringify(userInfo))
}
// 定义移除方法
export const removeInfo = () => {
  localStorage.removeItem(INFO_VEL)
}

// 将历史记录存储到本地
export const getHistory = () => {
  const res = localStorage.getItem(INFO_HISTORY)
  return res ? JSON.parse(res) : []
}
export const setHistory = (searchHist) => {
  localStorage.setItem(INFO_HISTORY, JSON.stringify(searchHist))
}
