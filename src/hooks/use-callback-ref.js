import * as React from "react"

const useCallbackRef = (callback) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...args) => callbackRef.current(...args)),
    []
  )
}

export { useCallbackRef }
