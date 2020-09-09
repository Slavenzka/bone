import React from 'react'
import css from './SelectStandard.module.scss'
import Select from 'react-select'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import classnames from 'classnames'

export const SelectStyleTypes = {
  LANG: 'lang',
  COMMON: 'common'
}

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
  icon
}) => {
  // You need react-select@3.0.4 to make it "see" simplebar. Does not work on newer versions of
  // react-select
  const renderScrollbar = props => {
    return (
      <SimpleBar style={{ maxHeight: '20rem' }} autoHide={false}>{props.children}</SimpleBar>
    )
  }

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
      className={classnames(css.wrapper, className, {
        [css.selectHeader]: type === SelectStyleTypes.LANG
      })}
      id={id}
    >
      {label &&
      <p className={css.label}>
        {label}
      </p>
      }
      { icon }
      <Select
        options={options}
        defaultValue={defaultValue || undefined}
        isSearchable={false}
        className={classnames(css.select, { [css.selectError]: isError })}
        classNamePrefix="select"
        components={{ MenuList: renderScrollbar }}
        styles={colourStyles}
        placeholder='Выбрать'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isDisabled={isDisabled}
        name={name || ''}
      />
    </div>
  )
}

export default SelectStandard
