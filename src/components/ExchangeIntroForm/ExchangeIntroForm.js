import React, { useEffect, useState } from 'react'
import css from './ExchangeIntroForm.module.scss'
import classnames from 'classnames'
import {
  DeviceTypes,
  gasFeeOptions,
  gasFeeOptionsAdaptive, LoadingStates,
  priceSlippageOptions, Themes
} from 'utils/const'
import { useForm } from 'react-hook-form'
import { Collapse } from 'react-collapse/lib/Collapse'
import SettingsBlock from 'components/SettingsBlock/SettingsBlock'
import Button from 'components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'
import { getTokens } from 'store/actions/data'
import IconBitcoin from 'assets/icons/IconBitcoin'
import Calculator from 'Pages/Home/Calculator/Calculator'
import useDebounce from 'hooks/useDebounce'
import Preloader from 'components/Preloader/Preloader'
import axiosBone from 'axiosBone'
import Web3 from 'web3'
import { miniABI } from 'components/ExchangeIntroForm/_assets/miniABI'
// import detectEthereumProvider from '@metamask/detect-provider'

const ExchangeIntroForm = ({ className, deviceType }) => {
  const [isCollapseOpened, toggleCollapseStatus] = useState(false)
  const dispatch = useDispatch()
  const loadingState = useSelector(state => state.data.loadingState)
  const userWallet = useSelector(state => state.data.userWallet)
  const tokens = useSelector(state => state.data.availableTokens)
    .map(({ symbol, name, address, decimals }) => ({
      label: symbol,
      value: address,
      descriptor: name,
      icon: IconBitcoin,
      decimals
    }))

  const fromValue = useSelector(state => state.data.exchangeEstimate.fromTokenAmount)
  const { register, control, watch, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      [`source-input`]: fromValue
    }
  })
  const defaultSource = tokens.find(item => item.label === 'USDT')
  const selectedSource = watch('source', defaultSource)
  const valueSource = watch('source-input') || 1
  const debouncedSourceValue = useDebounce(valueSource, 1000)
  const defaultResult = tokens[1]
  const selectedResult = watch('result', defaultResult) || {}
  // const radioFee = watch('radio input gas-fee')
  // const inputFee = watch('manual input gas-fee')

  const handleExchangeClick = (data, selectedSource) => {
    const dataRequest = {
      addressFrom: userWallet,
      amount: Number((+fromValue).toFixed(2)),
      from: data.source.label,
      to: data.result.label
    }

    axiosBone.post('/exchange/swap', dataRequest)
      .then(response => {
        const { to, gas, gasPrice, data } = response.data

        const dataExchange = {
          from: userWallet,
          to,
          gasLimit: `0x${(+gas).toString(16)}`,
          gasPrice: `0x${(+gasPrice).toString(16)}`,
          // value: `0x${(+value).toString(16)}`,
          data
        }

        const web3 = new Web3(window.ethereum)
        const decimals = web3.utils.toBN(selectedSource.decimals)
        const amount = web3.utils.toBN(dataRequest.amount)
        const contract = new web3.eth.Contract(miniABI, selectedSource.value)
        const valueTest = amount.mul(web3.utils.toBN(10).pow(decimals))
        // contract.methods.balanceOf(userWallet)
        //   .call()
        //   .then(response => {
        //     console.log(response)
        //   })


        contract.methods.transfer(to, valueTest).send({ ...dataExchange }).on('transactionHash', hash => {
          console.log(hash)
          localStorage.setItem('lastTransactionHash', hash)
        })

        // window.ethereum
        //   .request({
        //     method: `eth_sendTransaction`,
        //     params: dataExchange
        //   })
        //   .then(response => {
        //     console.log(response)
        //   })
        //   .catch(() => {
        //     // dispatch(toggleModal(true, <ModalWarning label='Произошла ошибка при выполнении транзакции' />))
        //   })
      })
  }

  const handleButtonClick = () => {
    dispatch(toggleModal(true, <ModalWallet />))
  }

  const handleClickToggle = () => {
    const container = Object.assign({}, selectedSource)
    setValue('source', Object.assign({}, selectedResult))
    setValue('result', container)
  }

  useEffect(() => {
    dispatch(getTokens())
  }, [dispatch])

  return (
    <div className={classnames(css.wrapper, className)}>
      <form onSubmit={handleSubmit(data => handleExchangeClick(data, selectedSource))}>
        <div className={css.currencies}>
          {loadingState === LoadingStates.TOKENS_LOADING &&
            <Preloader className={css.preloader} />
          }
          {loadingState !== LoadingStates.TOKENS_LOADING && tokens && tokens.length > 1 &&
            <Calculator
              register={register}
              control={control}
              handleClickToggle={handleClickToggle}
              supportedTokens={tokens}
              userWallet={userWallet}
              defaultSource={defaultSource}
              selectedSource={selectedSource}
              valueSource={debouncedSourceValue}
              defaultResult={defaultResult}
              selectedResult={selectedResult}
              getValues={getValues}
              setValue={setValue}
              isLoading={loadingState === LoadingStates.ESTIMATE_LOADING}
            />
          }
        </div>
        <button
          className={css.buttonCollapse}
          onClick={() => {
            toggleCollapseStatus(state => !state)
            dispatch(setTheme(isCollapseOpened ? Themes.DARK : Themes.LIGHT))
          }}
          type='button'
        >
          Customize transaction settings
        </button>
        <Collapse
          isOpened={isCollapseOpened}
          theme={{
            collapse: 'ReactCollapse--collapse',
            content: css.collapseContent
          }}
        >
          <SettingsBlock
            className={css.settings}
            label='GAS Fee'
            hint='Some hint for the gas fee block'
            options={deviceType === DeviceTypes.DESKTOP ? gasFeeOptions : gasFeeOptionsAdaptive}
            register={register}
            namespace='gas-fee'
            setValue={setValue}
          />
          <SettingsBlock
            className={css.settings}
            label='Limit additional price slippage'
            hint='Some hint for the price slippage block'
            options={priceSlippageOptions}
            register={register}
            namespace='price-slippage'
            setValue={setValue}
          />
        </Collapse>
        <Button
          className={css.button}
          label={userWallet ? 'Exchange now' : 'Connect Your Wallet'}
          type={userWallet ? 'submit' : 'button'}
          onClick={userWallet ? undefined : handleButtonClick}
        />
      </form>
    </div>
  )
}

export default ExchangeIntroForm
