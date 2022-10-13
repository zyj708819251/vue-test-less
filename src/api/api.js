import http from '@api/js/http'

/**
 *  api.getListAPI().then((res)=>{
      console.log(res);
    })
 */
export default {
  sendHttp(params){
     return http.get('/search/repositories?q=v&sort=stars', params)
  },
  getListAPI (params) {
    return http.get('./data/getList.json', params)
  },
	getRq (params) {
	  return http.get('/rq/dictionary/selectByType?type=yxzy_lx', params)
	}
}
