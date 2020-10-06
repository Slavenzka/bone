import React, { useEffect } from 'react'
import css from './InfoBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo'
import SelectStandard, { SelectStyleTypes } from 'components/Select/SelectStandard'
import { Controller } from 'react-hook-form'
import Input, { InputTypes } from 'components/Input/Input'

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
  isLoading
}) => {
  const currency = selectedCurrency || defaultCurrency
  const filteredOptions = options.filter(item => item.value !== currency.value)

  const icon = <CurrencyLogo type={currency.value} />

  useEffect(() => {
    const value = parseFloat(amount).toFixed(2)
    const existingValue = +getValues()[`${namespace}-input`]
    const isValueChanged = +existingValue !== +value

    if (isValueChanged) {
      setValue(`${namespace}-input`, value)
    }
  }, [amount, namespace, setValue, getValues])

  return (
    <div className={classnames(css.wrapper, className)}>
      <Heading
        className={css.key}
        color={HeadingTypes.colors.DARK}
        label={label}
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
          // menuIsOpen
        />
      </div>
      <p className={css.legend}>
        {/*<span className={css.from}>*/}
        {/*  { from }*/}
        {/*</span>*/}
        {/*<span className={css.to}>*/}
        {/*  { to }*/}
        {/*</span>*/}
      </p>
    </div>
  )
}

export default InfoBlock
