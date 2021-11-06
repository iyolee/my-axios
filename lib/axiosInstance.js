import Axios from './Axios.js';
import CancelToken from './CancelToken.js';
//创建实例
function createInstance(config) {
  const context = new Axios(config);
  var instance = Axios.prototype.request.bind(context);
  //将 Axios.prototype 属性扩展到 instance 上
  for (let k of Object.keys(Axios.prototype)) {
    instance[k] = Axios.prototype[k].bind(context);
  }
  //将 context 属性扩展到 instance 上
  for (let k of Object.keys(context)) {
    instance[k] = context[k]
  }
  return instance;
}


const axios = createInstance({});
axios.create = function (config) {
  return createInstance(config);
}
axios.CancelToken = CancelToken;

export default axios;