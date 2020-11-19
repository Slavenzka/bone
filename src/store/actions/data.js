import {
  CLEAR_ALLOWANCE,
  CONNECT_WALLET,
  CREATE_WEB3_INSTANCE, GET_ALLOWANCE,
  GET_AVAILABLE_TOKENS,
  GET_EXCHANGE_ESTIMATE, GET_SYSTEM_GAS,
  GET_WALLET_BALANCE,
  RESET_DATA,
  SAVE_SWAP_DATA,
  SAVE_TX_DATA, SET_GAS_FEE, SET_GAS_FEE_OPTIONS,
  SET_LOADING_STATE, SET_PRICE_SLIPPAGE,
} from 'store/actions/actionTypes'
import { setButtonType, toggleModal } from 'store/actions/ui'
import React from 'react'
import ModalWarning from 'components/Modal/ModalWarning/ModalWarning'
import axiosBone from 'axiosBone'
import { LoadingStates } from 'utils/const'
import { ActionButtonTypes } from 'utils/ActionButtonTypes'
import Web3 from 'web3'
import { erc20ABI } from 'abis/erc20ABI'
import BigNumber from 'bignumber.js'
import { checkAllowance, tokenApproveSequence } from 'utils/exchangerInteraction'
import axios from 'axios'
import { miniABI } from 'components/ExchangeIntroForm/_assets/miniABI'
import { getGasFeeOptions } from 'utils'

export const setLoadingState = newState => ({
  type: SET_LOADING_STATE,
  payload: newState
})

export const createWeb3Instance = () => {
  return {
    type: CREATE_WEB3_INSTANCE,
    payload: new Web3(window.ethereum)
  }
}

export const getWalletBalance = (wallet, currency) => {
  return (dispatch, getState) => {
    console.log(currency)
    if (currency.label !== 'ETH') {
      const web3 = getState().data.web3
      let contract =  new web3.eth.Contract(erc20ABI, currency.value)
      contract.methods.balanceOf(wallet).call()
        .then(response => {
          const balance = new BigNumber(response).shiftedBy(-currency.decimals).toString(10)
          dispatch({
            type: GET_WALLET_BALANCE,
            payload: (+balance).toFixed(balance > 0 ? 2 : 4)
          })
        })
    } else {
      window.ethereum
        .request({
          method: `eth_getBalance`,
          params: [
            `${wallet}`,
            `latest`
          ]
        })
        .then(response => {
          const ethBalance = new BigNumber(response, 16).shiftedBy(-18).toString(10)
          const balance = !isNaN(parseInt(`${ethBalance}`, 10))
            ? (+ethBalance).toFixed(4)
            : 0

          dispatch({
            type: GET_WALLET_BALANCE,
            payload: balance
          })
        })
    }
  }
}

export const  connectWallet = walletType => {
  return dispatch => {
    switch (walletType) {
      default:
        const isExtensionAvailable = !!window.ethereum

        if (!isExtensionAvailable) {
          dispatch(toggleModal(true, (
            <ModalWarning
              label={ `Metamask extension is not installed. Please, install it to proceed with the exchange.` }
              url={ `https://metamask.io/download.html` }
              walletType={walletType}
            />
          )))
        } else {
          window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(() => {
              const userWallet = window.ethereum.selectedAddress

              dispatch({
                type: CONNECT_WALLET,
                payload: userWallet
              })

              dispatch(createWeb3Instance())
              dispatch(toggleModal(false, null))
              dispatch(setButtonType(ActionButtonTypes.APPROVE))
            })
            .catch(error => {
              if (error.code === 4001) {
                dispatch(toggleModal(true, (
                  <ModalWarning
                    label={ `Metamask extension is not connected to this page. Please, connect it via metamask extension interface manually or choose wallet again.` }
                    walletType={walletType}
                  />
                )))
              } else {
                console.error(error)
              }
            })
        }
    }
  }
}

export const getTokens = () => {
  return dispatch => {
    dispatch(setLoadingState(LoadingStates.TOKENS_LOADING))
    axiosBone.get('/exchange/supported-tokens')
      .then(response => {
        const fetchedData = response?.data || {}

        dispatch(setLoadingState(LoadingStates.TOKENS_LOADED))

        dispatch({
          type: GET_AVAILABLE_TOKENS,
          payload: Object.values(fetchedData)
        })
      })
      .catch(() => {
        dispatch(setLoadingState(LoadingStates.TOKENS_LOAD_ERROR))
      })
  }
}

export const getExchangeEstimate = (amount, from, to) => {
  return (dispatch, getState) => {
    const loadingState = getState().data.loadingState
    const isLoading = loadingState === LoadingStates.ESTIMATE_LOADING || loadingState === LoadingStates.APPROVE_IN_PROCESS
    const actionButtonType = getState().ui.submitButtonType

    if (actionButtonType !== ActionButtonTypes.CONNECT) {
      dispatch(setButtonType(ActionButtonTypes.APPROVE))
    }

    if (!isLoading) {
      dispatch(setLoadingState(LoadingStates.ESTIMATE_LOADING))

      const data = {
        amount,
        from,
        to
      }

      axiosBone.post('/exchange/estimate', data)
        .then(response => {
          dispatch(setLoadingState(LoadingStates.ESTIMATE_LOADED))
          console.log(response.data)

          dispatch({
            type: GET_EXCHANGE_ESTIMATE,
            payload: response.data
          })
        })
        .catch(() => dispatch(setLoadingState(LoadingStates.ESTIMATE_ERROR)))
    }
  }
}

export const saveSwapData = fetchedData => {
  return {
    type: SAVE_SWAP_DATA,
    payload: fetchedData
  }
}

export const approveTransaction = data => {
  return (dispatch, getState) => {
    console.log(data)
    const userWallet = getState().data.userWallet
    const web3 = getState().data.web3
    const tokenInstance = new web3.eth.Contract(erc20ABI, data.source.value)
    const amountToExchange = data[`source-input`]
    const selectedSource = data.source
    const amountWithDecimals = new BigNumber(amountToExchange).shiftedBy(data.source.decimals).toFixed()
    const sourceSymbol = data.source.label
    const userSlippage = data[`manual input price-slippage`] || data[`radio input price-slippage`]

    const dataForWrapRequest = {
      addressFrom: userWallet,
      amount: Number((+amountToExchange).toFixed(4)),
      from: data.source.label,
      to: data.result.label,
      slippage: parseFloat(userSlippage).toFixed(2)
    }

    dispatch(setLoadingState(LoadingStates.ESTIMATE_LOADING))
    axiosBone.post('/exchange/swap', dataForWrapRequest)
      .then(response => {
        dispatch(setLoadingState(LoadingStates.ESTIMATE_LOADED))
        const {to, gas, gasPrice, data} = response.data
        dispatch(saveSwapData(response.data))

        if (sourceSymbol !== 'ETH') {
          checkAllowance(userWallet, tokenInstance, selectedSource, amountToExchange, allowance => dispatch(getAllowance(allowance)))
            .then(allowanceStatus => {
              return tokenApproveSequence({
                allowanceStatus,
                tokenInstance,
                amountWithDecimals,
                userWallet,
                gasPrice
              })
            })
            .then(status => {
              console.log(`Status before swap: ${status}`)
              dispatch(setButtonType(ActionButtonTypes.SWAP))
            })
        } else {
          dispatch(setButtonType(ActionButtonTypes.SWAP))
        }
      })
  }
}

export const executeSwap = (sourceData) => {
  return (dispatch, getState) => {
    console.log('Swap!')
    const web3 = getState().data.web3
    const userWallet = getState().data.userWallet
    const swapCalculation = getState().data.swapEstimate
    const { to, data, value } = swapCalculation
    const isETH = sourceData.source.label === 'ETH'
    const gasPrice = getState().data.selectedGasFee.split(' ')

    const dataToBeSent = {
      from: userWallet,
      to,
      gas: `0x${(500000).toString(16)}`,
      gasPrice: `${gasPrice.length > 1 ? gasPrice[1] * Math.pow(10, 9) : gasPrice[0] * Math.pow(10, 9)}`,
      data
    }

    if (isETH) {
      const dataToBeSent = {
        from: userWallet,
        to,
        gas: `0x${(350000).toString(16)}`,
        gasPrice: `${gasPrice.length > 1 ? gasPrice[1] * Math.pow(10, 9) : gasPrice[0] * Math.pow(10, 9)}`,
        value: `0x${(+value).toString(16)}`,
        data
      }

      const contract = new web3.eth.Contract(miniABI, sourceData.source.value)

      contract.methods.transfer(to, 0).send({ ...dataToBeSent })
        .on('transactionHash', hash => {
          console.log(hash)
          localStorage.setItem('lastTransactionHash', hash)
        })
        .catch(error => {
          console.log('error')
        })

      return
    }

    web3.eth.sendTransaction({...dataToBeSent})
      .then(response => {
        console.log(response)
        dispatch(saveTxHash(response))
        // localStorage.setItem('lastBoneTransactionHash', transactionHash)
      })
      .catch(error => {
        console.log('Send transaction error!')
        console.log(error)
      })
  }
}

export const saveTxHash = data => ({
  type: SAVE_TX_DATA,
  payload: data
})

export const resetData = () => ({
  type: RESET_DATA
})

export const getAllowance = allowance => ({
  type: GET_ALLOWANCE,
  payload: allowance
})

export const clearAllowance = () => ({
  type: CLEAR_ALLOWANCE
})

export const getSystemGas = () => {
  return (dispatch, getState) => {
    const existingGas = getState().data.systemGas

    if (!existingGas) {
      axios.get(`https://ethgasstation.info/api/ethgasAPI.json?api-key=${process.env.REACT_APP_API_KEY_GASSTATION}`)
        .then(response => {
          const options = getGasFeeOptions(response.data)
          dispatch({
            type: SET_GAS_FEE_OPTIONS,
            payload: options
          })

          const gasPriceGwei = response.data.average / 10
          dispatch({
            type: GET_SYSTEM_GAS,
            payload: gasPriceGwei
          })
        })
    }
  }
}

export const setGasFeeOptions = data => ({
  type: SET_GAS_FEE_OPTIONS,
  payload: data
})

export const setGasFee = value => ({
  type: SET_GAS_FEE,
  payload: value
})

export const setPriceSlippage = value => ({
  type: SET_PRICE_SLIPPAGE,
  payload: value
})
