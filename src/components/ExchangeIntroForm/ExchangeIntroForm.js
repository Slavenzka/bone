import React, { useEffect, useState } from 'react'
import css from './ExchangeIntroForm.module.scss'
import classnames from 'classnames'
import {
  priceSlippageOptions,
  LoadingStates,
  Themes
} from 'utils/const'
import { useForm } from "react-hook-form"
import { Collapse } from 'react-collapse/lib/Collapse'
import SettingsBlock from 'components/SettingsBlock/SettingsBlock'
import Button from 'components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { resetData, setTheme, toggleModal } from 'store/actions'
import { getTokens } from 'store/actions/data'
import IconBitcoin from 'assets/icons/IconBitcoin'
import Calculator from 'Pages/Home/Calculator/Calculator'
import useDebounce from 'hooks/useDebounce'
import Preloader from 'components/Preloader/Preloader'
import ModalSuccess from 'components/Modal/ModalSuccess/ModalSuccess'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'
import { ActionButtonTypes } from 'utils/ActionButtonTypes'

const DEBOUNCE_DELAY = 500
const DEFAULT_FROM_TOKEN = 'USDT'
const DEFAULT_FROM_AMOUNT = 1
const DEFAULT_TO_TOKEN = 'DAI'

const ExchangeIntroForm = ({ className }) => {
  const [isCollapseOpened, toggleCollapseStatus] = useState(false)
  const dispatch = useDispatch()
  const gasFeeOptions = useSelector(state => state.data.gasFeeOptions)
  const mainButton = useSelector(state => state.ui.submitButtonType)
  const loadingState = useSelector(state => state.data.loadingState)
  const userWallet = useSelector(state => state.data.userWallet)
  const tokens = useSelector(state => state.data.availableTokens)
    // .filter(item => item.symbol !== 'ETH')
    .sort((a, b) => {
      if (
        a.symbol !== 'DAI' &&
        a.symbol !== 'USDT' &&
        a.symbol !== 'USDC' &&
        a.symbol !== 'BUSD' &&
        a.symbol !== 'ETH'
      ) {
        return 1
      }
      return -1
    })
    .map(({ symbol, name, address, decimals }) => ({
      label: symbol,
      value: address,
      descriptor: name,
      icon: IconBitcoin,
      decimals
    }))
  // const allowance = useSelector(state => state.data.allowance)
  const txData = useSelector(state => state.data.txData) || {}

  const fromValue = useSelector(state => state.data.exchangeEstimate.fromTokenAmount)
  const { register, control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      [`source-input`]: fromValue
    }
  })
  const defaultSource = tokens.find(item => item.label === DEFAULT_FROM_TOKEN)
  const selectedSource = watch('source', defaultSource)
  const valueSource = watch('source-input') || DEFAULT_FROM_AMOUNT
  const debouncedSourceValue = useDebounce(valueSource, DEBOUNCE_DELAY)
  const defaultResult = tokens.find(item => item.label === DEFAULT_TO_TOKEN)
  const selectedResult = watch('result', defaultResult) || {}
  // const radioFee = watch('radio input gas-fee')
  // const inputFee = watch('manual input gas-fee')

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

  useEffect(() => {
    const resetForm = () => {
      reset({
        [`source-input`]: DEFAULT_FROM_AMOUNT,
        [`result-input`]: '',
        [`source`]: tokens.find(item => item.label === DEFAULT_FROM_TOKEN),
        [`result`]: tokens.find(item => item.label === DEFAULT_TO_TOKEN)
      })
    }

    if (txData.transactionHash) {
      console.log(reset)
      dispatch(toggleModal(true, <ModalSuccess data={txData} />))
      dispatch(resetData())
      resetForm()

    }
  }, [txData.transactionHash, dispatch, txData, reset, tokens])

  return (
    <div className={classnames(css.wrapper, className)}>
      <form onSubmit={handleSubmit(data => dispatch(mainButton.clickHandler(data)))}>
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
              valueSource={valueSource === DEFAULT_FROM_AMOUNT ? DEFAULT_FROM_AMOUNT : debouncedSourceValue}
              defaultResult={defaultResult}
              selectedResult={selectedResult}
              getValues={getValues}
              setValue={setValue}
              isLoading={loadingState === LoadingStates.ESTIMATE_LOADING || loadingState === LoadingStates.APPROVE_IN_PROCESS}
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
            options={gasFeeOptions}
            register={register}
            namespace='gas-fee'
            setValue={setValue}
            watch={watch}
            isInitial={mainButton === ActionButtonTypes.CONNECT}
          />
          <SettingsBlock
            className={css.settings}
            label='Limit additional price slippage'
            hint='Some hint for the price slippage block'
            options={priceSlippageOptions}
            register={register}
            namespace='price-slippage'
            setValue={setValue}
            watch={watch}
            isInitial={mainButton === ActionButtonTypes.CONNECT}
            isSlippage
          />
        </Collapse>
        <Button
          className={css.button}
          label={mainButton.label}
          type={mainButton.type}
          onClick={mainButton.type === 'button' ? handleButtonClick : undefined}
        />
      </form>
    </div>
  )
}

export default ExchangeIntroForm
