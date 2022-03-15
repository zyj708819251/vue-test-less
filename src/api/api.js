import http from '@api/js/http'

/**
 *  api.getListAPI().then((res)=>{
      console.log(res);
    })
 */
export default {
  sendHttp(params){
     return http.get($rootUrl+ '/wldata/sentHttp', params)
  },
  getListAPI (params) {
    return http.get('./data/getList.json', params)
  }
}
