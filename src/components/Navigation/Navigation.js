import React from 'react'
import css from './Navigation.module.scss'
import { pageLinks } from 'Pages/Routes'
import Link from 'components/Link/Link'
import classnames from 'classnames'
import Button, { ButtonTypes } from 'components/Button/Button'
import { toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'
import { useDispatch } from 'react-redux'

const Navigation = () => {
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    dispatch(toggleModal(true, <ModalWallet />))
  }

  return (
    <nav className={css.wrapper}>
      {pageLinks.map(({label, url}, index) => (
        <Link
          className={classnames(css.link, css.item)}
          link={url}
          key={`Header link#${index}`}
          text={label}
        />
      ))}
      <Button
        className={classnames(css.item, css.button)}
        label='Connect Wallet'
        onClick={handleButtonClick}
        buttonStyle={ButtonTypes.BORDERED}
      />
    </nav>
  )
}

export default Navigation
