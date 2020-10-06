import React, { useEffect } from 'react'
import css from './Calculator.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getExchangeEstimate } from 'store/actions/data'
import IconExchange from 'assets/icons/IconExchange'
import InfoBlock from 'components/InfoBlock/InfoBlock'

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
  const { fromTokenAmount, toTokenAmount } = exchangeEstimate

  useEffect(() => {
    const { source, result } = getValues()

    if (source && result) {
      dispatch(getExchangeEstimate(valueSource, source.label, result.label))
    }
  }, [dispatch, getValues, selectedSource, valueSource, selectedResult])

  return (
    <>
      <button
        className={css.buttonToggle}
        onClick={handleClickToggle}
        type='button'
      >
        Toggle currencies
        <IconExchange className={css.icon} />
      </button>
      <InfoBlock
        className={css.item}
        namespace='source'
        options={supportedTokens}
        amount={fromTokenAmount}
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
        isLoading={isLoading}
      />
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
        value={8.89942446}
        legend=''
        setValue={setValue}
        getValues={getValues}
        isLoading={isLoading}
        isInputDisabled
      />
    </>

  )
}

export default Calculator
