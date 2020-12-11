import React from 'react'
import css from './Navigation.module.scss'
import Link from 'components/Link/Link'
import classnames from 'classnames'
import Button, { ButtonTypes } from 'components/Button/Button'
import { toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'
import { useDispatch, useSelector } from 'react-redux'
import ModalHistory from 'components/Modal/ModalHistory/ModalHistory'

const Navigation = () => {
  const dispatch = useDispatch()
  const userWallet = useSelector(state => state.data.userWallet)

  const handleButtonClick = () => {
    dispatch(toggleModal(true, <ModalWallet />))
  }

  const handleShowTransactons = () => {
    dispatch(toggleModal(true, <ModalHistory />))
  }

  return (
    <nav className={css.wrapper}>
      <Button
        className={classnames(css.item)}
        label='Transactions history'
        onClick={userWallet ? handleShowTransactons : handleButtonClick}
        buttonStyle={ButtonTypes.TEXT_ONLY}
      />
      <Link
        className={classnames(css.link, css.item)}
        link='http://ditex.app'
        text='Buy Crypto'
      />
      <Button
        className={classnames(css.item, css.button)}
        label={userWallet ? 'Change Wallet' : 'Connect Wallet'}
        onClick={handleButtonClick}
        buttonStyle={ButtonTypes.BORDERED}
      />
    </nav>
  )
}

export default Navigation
