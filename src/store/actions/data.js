import {
  CONNECT_WALLET,
  GET_AVAILABLE_TOKENS, GET_EXCHANGE_ESTIMATE, GET_WALLET_BALANCE,
  SET_LOADING_STATE,
} from 'store/actions/actionTypes'
import { toggleModal } from 'store/actions/ui'
import React from 'react'
import ModalWarning from 'components/Modal/ModalWarning/ModalWarning'
import axiosBone from 'axiosBone'
import { LoadingStates } from 'utils/const'

export const setLoadingState = newState => ({
  type: SET_LOADING_STATE,
  payload: newState
})

export const getWalletBalance = wallet => {
  return dispatch => {
    window.ethereum
      .request({
        method: `eth_getBalance`,
        params: [
          `${wallet}`,
          `latest`
        ]
      })
      .then(response => {
        const balance = !isNaN(parseInt(`${response}`, 10))
          ? parseInt(`${response}`, 10)
          : 0

        dispatch({
          type: GET_WALLET_BALANCE,
          payload: balance
        })
      })
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

              dispatch(getWalletBalance(userWallet))
              dispatch(toggleModal(false, null))
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
  return dispatch => {
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
