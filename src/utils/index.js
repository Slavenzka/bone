export const debounce = func => {
  let lastTimeout = null

  return function () {
    const context = this
    const args = arguments

    if (lastTimeout) {
      clearTimeout(lastTimeout)
    }

    lastTimeout = setTimeout(function () {
      func.apply(context, args)
    }, 250)
  }
}

export const updateObject = (object, field) => Object.assign({}, object, field)
