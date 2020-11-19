import React, { useEffect } from 'react'
import css from './SettingsBlock.module.scss'
import classnames from 'classnames'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import Radio from 'components/Radio/Radio'
import Input from 'components/Input/Input'
import { useDispatch } from 'react-redux'
import { setButtonType, setGasFee } from 'store/actions'
import { ActionButtonTypes } from 'utils/ActionButtonTypes'

const SettingsBlock = ({
  className,
  label,
  hint,
  options,
  namespace,
  register,
  watch,
  setValue,
  isInitial,
  isSlippage
}) => {
  const dispatch = useDispatch()
  const defaultSelection = options.find(item => item.isDisabled)
  const manualValue = watch(`manual input ${namespace}`, '')
  const selectedValue = watch(`radio input ${namespace}`, defaultSelection ? defaultSelection.value : null)

  useEffect(() => {
    if (manualValue) {
      setValue(`radio input ${namespace}`, null)
      !isSlippage && dispatch(setGasFee(manualValue))
    }
    !isInitial && dispatch(setButtonType(ActionButtonTypes.APPROVE))
  }, [manualValue])

  useEffect(() => {
    if (selectedValue) {
      setValue(`manual input ${namespace}`, '')
      !isSlippage && dispatch(setGasFee(selectedValue))
    }
    !isInitial && dispatch(setButtonType(ActionButtonTypes.APPROVE))
  }, [selectedValue])

  const items = options.map(({ label, value, isDefault }, index) => {
    return (
      <li key={`${label} option#${index}`}>
        <Radio
          name={`radio input ${namespace}`}
          register={register}
          value={isSlippage ? `${value} %` : `${label}: ${value}`}
          isDefault={isDefault}
        />
      </li>
    )
  })

  items.push(
    <li key={`${label} input field`}>
      <Input
        name={`manual input ${namespace}`}
        register={register}
      />
    </li>
  )

  return (
    <div
      className={classnames(css.wrapper, className)}
    >
      <Heading
        className={css.heading}
        label={label}
        size={HeadingTypes.size.MEDIUM}
        color={HeadingTypes.colors.LIGHTEST}
        tag='h3'
      />
      <ul
        className={css.list}
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr) 8.9rem`
        }}
      >
        {items}
      </ul>
    </div>
  )
}

export default SettingsBlock
