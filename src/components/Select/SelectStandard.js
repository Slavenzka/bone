import React from 'react'
import css from './SelectStandard.module.scss'
import Select from 'react-select'
import 'simplebar/dist/simplebar.min.css'
import classnames from 'classnames'
import CurrencyOption from 'components/Select/CurrencyOption/CurrencyOption'
import SelectMenu from 'components/Select/SelectMenu/SelectMenu'

export const SelectStyleTypes = {
  LANG: 'lang',
  COMMON: 'common',
  CURRENCY: 'currency'
}

// You need react-select@3.0.4 to make it "see" simplebar. Does not work on newer versions of
// react-select
const SelectStandard = ({
  className,
  onChange,
  onBlur,
  value,
  options,
  defaultValue,
  label = '',
  isDisabled,
  isError,
  type = SelectStyleTypes.COMMON,
  id,
  name,
  isCalculator,
  menuIsOpen,
  isSearchable,
  components = {},
}) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: isDisabled ? 'transparent' : 'transparent',
      boxShadow: 'none'
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: '0',
      borderTop: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent'
    }),
    dropdownIndicator: (styles, { selectProps }) => {
      return {
        ...styles,
        display: isDisabled ? 'none' : 'block',
        transition: 'all 0.3s',
        transform: `rotate(${selectProps.menuIsOpen ? 180 : 0}deg)`
      }
    },
    option: styles => ({
      ...styles,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }),
  };

  return (
    <div
      className={classnames(css.wrapper, className)}
      id={id}
    >
      {label &&
        <p className={css.label}>
          {label}
        </p>
      }
      {isCalculator
        ? <Select
          options={options}
          defaultValue={defaultValue || undefined}
          isSearchable={isSearchable}
          className={classnames(css.select, {
            [css.selectCurrency]: type === SelectStyleTypes.CURRENCY,
            [css.selectLang]: type === SelectStyleTypes.LANG,
            [css.selectError]: isError
          })}
          classNamePrefix="select"
          components={{ MenuList: SelectMenu, Option: CurrencyOption, ...components }}
          styles={colourStyles}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          isDisabled={isDisabled}
          name={name || ''}
          backspaceRemovesValue={false}
          captureMenuScroll={true}
          menuIsOpen={menuIsOpen}
          controlShouldRenderValue={false}
          placeholder='Search'
          autoFocus
        />
        : <Select
          options={options}
          defaultValue={defaultValue || undefined}
          isSearchable={isSearchable}
          className={classnames(css.select, {
            [css.selectCurrency]: type === SelectStyleTypes.CURRENCY,
            [css.selectLang]: type === SelectStyleTypes.LANG,
            [css.selectError]: isError
          })}
          classNamePrefix="select"
          styles={colourStyles}
          placeholder='Выбрать'
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          isDisabled={isDisabled}
          captureMenuScroll={true}
          name={name || ''}
        />
      }
    </div>
  )
}

export default SelectStandard
