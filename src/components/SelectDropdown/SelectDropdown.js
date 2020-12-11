import React, { useState } from 'react'
import css from './SelectDropdown.module.scss'
import SelectStandard, { SelectStyleTypes } from 'components/Select/SelectStandard'
import IconArrowSelect from 'assets/icons/IconArrowSelect'
import classnames from 'classnames'

const SelectDropdown = ({
  options,
  selectedValue,
  isDisabled,
  onSelectChange
}) => {
  const [isDropdownOpen, toggleDropdownStatus] = useState(false)

  const Menu = props => {
    return (
      <div
        className={css.menu}
        {...props}
      />
    )
  }

  const Blanket = props => (
    <div
      className={css.blanket}
      {...props}
    />
  )

  const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div className={css.dropdown}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
      {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
  )

  const Svg = props => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...props}
    />
  )

  const DropdownIndicator = () => (
    <div className={css.dropdownIndicator}>
      <Svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Svg>
    </div>
  )

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onClose={() => toggleDropdownStatus(state => !state)}
      target={
        <button
          className={css.trigger}
          onClick={() => {
            toggleDropdownStatus(state => !state)
          }}
          type='button'
        >
          {/*{ icon }*/}
          {selectedValue ? `${selectedValue.label}` : 'Select a token'}
          <span className={classnames(css.iconWrapper, { [css.iconWrapperOpen]: isDropdownOpen })}>
            <IconArrowSelect className={css.icon} />
          </span>
        </button>
      }
    >
      <SelectStandard
        value={selectedValue}
        className={css.select}
        options={options}
        type={SelectStyleTypes.CURRENCY}
        isCalculator
        isDisabled={isDisabled}
        menuIsOpen
        components={{ DropdownIndicator }}
        onChange={evt => {
          onSelectChange(evt)
          toggleDropdownStatus(false)
        }}
      />
    </Dropdown>
  )
}

export default SelectDropdown
