import React, { useEffect } from 'react'
import css from './InfoBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo'
import SelectStandard, { SelectStyleTypes } from 'components/Select/SelectStandard'
import { Controller } from 'react-hook-form'
import Input, { InputTypes } from 'components/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getWalletBalance } from 'store/actions/data'

const InfoBlock = ({
   className,
   control,
   register,
   label = 'Some label',
   namespace,
   amount,
   defaultCurrency,
   selectedCurrency,
   legend = 'Some legend data',
   options,
   balance,
   isWalletConnected,
   isInputDisabled,
   setValue,
   getValues,
   isLoading,
   isResult,
   isSource
}) => {
  const balanceCurrentToken = useSelector(state => state.data.userBalance)
  const wallet = useSelector(state => state.data.userWallet)
  const currency = selectedCurrency || defaultCurrency
  const filteredOptions = options.filter(item => item.value !== currency.value)
  const dispatch = useDispatch()
  const headingLabel = isSource
    ? (
      <p className={css.label}>
        { label }
        {isWalletConnected &&
          <span className={css.from}>
            {`${balanceCurrentToken}  ${currency.label}`}
          </span>
        }
      </p>
    )
    : label

  const icon = <CurrencyLogo type={currency.value} />

  useEffect(() => {
    const value = parseFloat(amount).toFixed(4)
    const existingValue = +getValues()[`${namespace}-input`]
    const isValueChanged = +existingValue !== +value

    if (isValueChanged) {
      setValue(`${namespace}-input`, value)
    }
  }, [amount, namespace, setValue, getValues])

  useEffect(() => {
    console.log(isSource)
    console.log(wallet)
    if (isSource && wallet) {
      console.log(currency)
      dispatch(getWalletBalance(wallet, currency))
    }
  }, [currency, wallet])

  return (
    <div className={classnames(css.wrapper, className)}>
      <Heading
        className={css.key}
        color={HeadingTypes.colors.DARK}
        label={headingLabel}
        size={HeadingTypes.size.SMALL}
        tag='h2'
      />
      <div className={css.content}>
        <Input
          className={css.input}
          register={register}
          name={`${namespace}-input`}
          defaultValue={''}
          isDisabled={isLoading || isInputDisabled}
          inputType={InputTypes.CALCULATOR}
        />
        <Controller
          as={SelectStandard}
          name={namespace}
          control={control}
          defaultValue={defaultCurrency}
          className={css.select}
          options={filteredOptions}
          icon={icon}
          type={SelectStyleTypes.CURRENCY}
          isCalculator
          isDisabled={isLoading}
          isSearchable
          // menuIsOpen
        />
      </div>
      {/*{isResult &&*/}
      {/*  <p className={css.legend}>*/}
      {/*    <span className={css.from}>*/}
      {/*      {`min: 50 ETH, max: 50 ETH`}*/}
      {/*    </span>*/}
      {/*    <span className={css.to}>*/}
      {/*      { to }*/}
      {/*    </span>*/}
      {/*  </p>*/}
      {/*}*/}
    </div>
  )
}

export default InfoBlock
