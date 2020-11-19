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

export const getGasFeeOptions = data => {
  return data.fastest !== data.fast ? [
    {
      label: 'Fastest',
      value: data.fastest / 10
    },
    {
      label: 'Fast',
      value: data.fast / 10
    },
    {
      label: 'Avg.',
      value: data.average / 10,
      isDefault: true,
    },
  ] : [
    {
      label: 'Fastest',
      value: data.fastest / 10
    },
    {
      label: 'Avg.',
      value: data.average / 10,
      isDefault: true,
    },
    {
      label: 'Min.',
      value: data.safeLow / 10,
      isDefault: true,
    },
  ]

}
