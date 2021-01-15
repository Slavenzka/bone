import React, { useEffect } from 'react'
import css from './Calculator.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getExchangeEstimate } from 'store/actions/data'
import IconExchange from 'assets/icons/IconExchange'
import InfoBlock from 'components/InfoBlock/InfoBlock'
import Preloader, { PreloaderTypes } from 'components/Preloader/Preloader'

const Calculator = ({
  control,
  register,
  handleClickToggle,
  supportedTokens,
  userWallet,
  defaultSource,
  selectedSource,
  valueSource,
  defaultResult,
  selectedResult,
  getValues,
  setValue,
  isLoading
}) => {
  const dispatch = useDispatch()
  const exchangeEstimate = useSelector(state => state.data.exchangeEstimate)
  const userBalance = useSelector(state => state.data.userBalance)
  const { toTokenAmount } = exchangeEstimate

  const renderIcon = isLoading => isLoading
    ? (
      <Preloader
        className={css.preloader}
        type={PreloaderTypes.MINIFIED}
      />
    )
    : <IconExchange className={css.icon} />

  useEffect(() => {
    if (selectedSource && selectedResult) {
      dispatch(getExchangeEstimate(valueSource, selectedSource.value, selectedResult.value, selectedSource.decimals))
    }
  }, [dispatch, selectedSource, valueSource, selectedResult])

  return (
    <>
      <InfoBlock
        className={css.item}
        namespace='source'
        options={supportedTokens}
        amount={valueSource}
        defaultCurrency={defaultSource}
        selectedCurrency={selectedSource}
        control={control}
        register={register}
        label='You have'
        legend=''
        balance={userBalance}
        isWalletConnected={userWallet}
        setValue={setValue}
        getValues={getValues}
        isSource
        isLoading={isLoading}
      />
      <button
        className={css.buttonToggle}
        onClick={handleClickToggle}
        type='button'
        disabled={isLoading}
      >
        Toggle currencies
        { renderIcon(isLoading) }
      </button>
      <InfoBlock
        className={css.item}
        namespace='result'
        options={supportedTokens}
        amount={toTokenAmount}
        defaultCurrency={defaultResult}
        selectedCurrency={selectedResult}
        control={control}
        register={register}
        label='You get'
        setValue={setValue}
        getValues={getValues}
        estimate={exchangeEstimate}
        isLoading={isLoading}
        isResult
        isInputDisabled
      />
    </>

  )
}

export default Calculator
