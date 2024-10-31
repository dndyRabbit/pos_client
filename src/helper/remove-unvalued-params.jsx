export default function removeUnvaluedParams(params = {}) {
  for (const prop in params) {
    if (params.hasOwnProperty(prop)) {
      if ((params[prop] === '') || (params[prop] === null || params[prop]?.length <= 0)) {
        delete params[prop];
      }
    }
  }

  return params
}
