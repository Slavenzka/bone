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

export const priceSlippageOptions = [
  {
    value: '0.1',
  },
  {
    value: '0.5',
  },
  {
    value: '1',
    isDefault: true
  },
  {
    value: '3',
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
  APPROVE_IN_PROCESS: 'APPROVE_IN_PROCESS',
  APPROVE_SUCCESS: 'APPROVE_SUCCESS',
  APPROVE_ERROR: 'APPROVE_ERROR'
}

export const exchangerAddress = '0xe4c9194962532feb467dce8b3d42419641c6ed2e'

export const OperationTypes = {
  RECEIVE: 'RECEIVE',
  SEND: 'SEND'
}

export const GAS_LIMIT_APPROVAL = 100000
export const GAS_LIMIT_SWAP_ERC20 = 500000
export const GAS_LIMIT_SWAP_ETH = 350000
