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

export const addLeadingZero = number =>
  number < 10 ? `0${number}` : `${number}`

export const formatDate = timestamp => {
  const date = new Date(timestamp)

  const day = addLeadingZero(date.getUTCDate())
  const month = addLeadingZero(date.getUTCMonth() + 1)
  const year = date.getUTCFullYear()

  const hours = addLeadingZero(date.getUTCHours())
  const minutes = addLeadingZero(date.getUTCMinutes())

  return {
    formattedDate: `${day}.${month}.${year}`,
    formattedTime: `${hours}:${minutes}`,
  }
}
