import React from 'react'
import css from './InfoBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import CurrencyLogo, { CurrencyTypes } from 'components/CurrencyLogo/CurrencyLogo'
import SelectStandard from 'components/Select/SelectStandard'
import { Controller } from 'react-hook-form'

const InfoBlock = ({
  className,
  control,
  label = 'Some label',
  namespace,
  value = 'Some value',
  defaultCurrency = CurrencyTypes.BITCOIN,
  selectedCurrency,
  from = '0',
  to = '0',
  options
}) => {
  const currency = selectedCurrency || defaultCurrency
  const filteredOptions = options.filter(item => item.value !== currency.value)

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
        <p className={css.value}>
          { value }
        </p>
        <Controller
          as={SelectStandard}
          name={namespace}
          control={control}
          defaultValue={defaultCurrency}
          className={css.select}
          options={filteredOptions}
        />
      </div>
      <p className={css.legend}>
        <span className={css.from}>
          { from }
        </span>
        <span className={css.to}>
          { to }
        </span>
      </p>
    </div>
  )
}

export default InfoBlock
