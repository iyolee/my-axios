//拦截器
function InterceptorManager() {
  this.handlers = [];
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
}

export default InterceptorManager;