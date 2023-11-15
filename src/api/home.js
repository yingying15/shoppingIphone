// 导入请求
import request from '@/utils/request'
// 请求页面内容
export const getContent = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
