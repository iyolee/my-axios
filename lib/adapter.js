//适配器
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    //导入 XHR 对象请求
    adapter = (config) => {
      return xhrAdapter(config);
    }
  }
  return adapter;
}
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: {},
            status: xhr.status,
            statusText: xhr.statusText,
            xhr: xhr
          })
        } else {
          reject({
            status: xhr.status
          })
        }
      }
    };
    //取消请求
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!xhr) {
          return;
        }
        xhr.abort();
        reject("请求已取消");
        // clean up xhr
        xhr = null;
      })
    }
  })
}

export default getDefaultAdapter;