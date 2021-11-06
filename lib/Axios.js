import getDefaultAdapter from './adapter.js';
import InterceptorManager from './InterceptorManager.js';

//Axios 主体
function Axios(config) {
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

// 核心方法
Axios.prototype.request = function (config) {
  const adapter = getDefaultAdapter(config);
  var promise = Promise.resolve(config);
  var chain = [adapter, undefined];

  this.interceptors.request.handlers.forEach(item => {
    chain.unshift(item.rejected);
    chain.unshift(item.fulfilled);

  });

  this.interceptors.response.handlers.forEach(item => {
    chain.push(item.fulfilled);
    chain.push(item.rejected)
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
}

Axios.prototype.get = function (url, config = {}) {
  return this.request({ url: url, method: 'GET', ...config });
}

Axios.prototype.post = function (url, data, config = {}) {
  return this.request({ url: url, method: 'POST', data: data, ...config })
}

export default Axios;