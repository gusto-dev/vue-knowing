export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key, params = {}) => {
      return key
        .split('.')
        .reduce(
          (accumulator, currentValue) =>
            accumulator && accumulator[currentValue],
          options
        )
        .replace(/{(\w+)}/g, (match, key) => params[key])
    }
  }
}
