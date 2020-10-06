export const DeviceTypes = {
  DESKTOP: 'desktop',
  ADAPTIVE: 'adaptive'
}

export const LangOptions = [
  {
    label: 'EN',
    value: 'EN'
  },
  {
    label: 'UA',
    value: 'UA'
  },
]

export const CurrencyOptions = [
  {
    label: 'BTC',
    value: 'BTC',
  },
  {
    label: 'ETH',
    value: 'ETH',
  },
]

export const gasFeeOptions = [
  {
    value: '87 Standart',
    isDefault: true
  },
  {
    value: '93 Fast'
  },
  {
    value: '102 Instant'
  },
]

export const gasFeeOptionsAdaptive = [
  {
    value: '87',
    isDefault: true
  },
  {
    value: '93'
  },
  {
    value: '102'
  },
]

export const priceSlippageOptions = [
  {
    value: '0.1%',
  },
  {
    value: '0.5%',
  },
  {
    value: '1%',
    isDefault: true
  },
  {
    value: '3%',
  },
]

export const Themes = {
  LIGHT: 'light',
  DARK: 'dark'
}

export const LoadingStates = {
  TOKENS_LOADING: 'TOKENS_LOADING',
  TOKENS_LOADED: 'TOKENS_LOADED',
  TOKENS_LOAD_ERROR: 'TOKENS_LOAD_ERROR',
  ESTIMATE_LOADING: 'ESTIMATE_LOADING',
  ESTIMATE_LOADED: 'ESTIMATE_LOADED',
  ESTIMATE_ERROR: 'ESTIMATE_ERROR',
}
