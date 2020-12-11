import React, { useEffect, useRef } from 'react'
import css from './InfoBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import CurrencyLogo from 'components/CurrencyLogo/CurrencyLogo'
import SelectStandard  from 'components/Select/SelectStandard'
import { Controller } from 'react-hook-form'
import Input, { InputTypes } from 'components/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getWalletBalance } from 'store/actions/data'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'
import { GAS_LIMIT_APPROVAL, GAS_LIMIT_SWAP_ERC20 } from 'utils/const'

const InfoBlock = ({
   className,
   control,
   register,
   label = 'Some label',
   namespace,
   amount,
   defaultCurrency,
   selectedCurrency,
   // legend = 'Some legend data',
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
  const gas = useSelector(state => state.data.systemGas)
  const wallet = useSelector(state => state.data.userWallet)
  const tokensRating = useSelector(state => state.data.tokensRating) || []
  const ethPrice = tokensRating.find(item => item.id === 'ethereum')?.[`current_price`]
  const currency = selectedCurrency || defaultCurrency
  const filteredOptions = options.filter(item => item.value !== currency.value)
  const contentWrapperRef = useRef(null)
  const inputRef = useRef(null)
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

  const transactionTotalCost = GAS_LIMIT_APPROVAL * gas / Math.pow(10, 9) + GAS_LIMIT_SWAP_ERC20 * gas / Math.pow(10, 9)
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
    if (isSource && wallet) {
      dispatch(getWalletBalance(wallet, currency))
    }
  }, [currency, wallet, dispatch, isSource])

  useEffect(() => {
    const handleClickArea = evt => {
      if (evt.target === contentWrapperRef.current) {
        console.log('Click')
        inputRef.current.focus()
      }
    }
    const wrapper = contentWrapperRef.current

    if (isSource && contentWrapperRef.current && inputRef.current) {
      wrapper.addEventListener('click', handleClickArea)
    }

    return () => {
      wrapper.removeEventListener('click', handleClickArea)
    }
  }, [isSource])

  const handleClickExchangeAll = () => {
    setValue(`${namespace}-input`, balance)
  }

  const createInputRef = node => inputRef.current = node

  return (
    <div className={classnames(css.wrapper, className)}>
      <Heading
        className={css.key}
        color={HeadingTypes.colors.DARK}
        label={headingLabel}
        size={HeadingTypes.size.SMALL}
        tag='h2'
      />
      <div className={css.content} ref={contentWrapperRef}>
        <Input
          className={css.input}
          register={register}
          name={`${namespace}-input`}
          defaultValue={''}
          isDisabled={isLoading || isInputDisabled}
          inputType={InputTypes.CALCULATOR}
          createRef={createInputRef}

        />
        <SelectDropdown
          options={filteredOptions}
          control={control}
          namespace={namespace}
          selectedValue={selectedCurrency}
          icon={icon}
          isDisabled={isLoading}
          onSelectChange={evt => {
            setValue(namespace, evt)
          }}
        />
        <Controller
          as={SelectStandard}
          name={namespace}
          control={control}
          defaultValue={selectedCurrency}
          className='visuallyHidden'
          options={[]}
        />
      </div>
      {isSource && !!balance &&
        <button
          className={css.buttonAll}
          onClick={handleClickExchangeAll}
          type='button'
        >
          Exchange all
        </button>
      }
      {isResult && !Number.isNaN(+transactionTotalCost) && ethPrice &&
        <span className={css.legend}>
          { `Estimated transaction cost: ${(transactionTotalCost * ethPrice).toFixed(4)} USD` }
        </span>
      }
    </div>
  )
}

export default InfoBlock
