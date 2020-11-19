import React from 'react'
import css from 'components/Modal/ModalStatus/ModalStatus.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'

const ModalStatus = ({ className, label }) => {
  const dispatch = useDispatch()

  return (
    <div className={css.wrapper}>
      <p
        className={classnames(css.message, className)}
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  )
}

export default ModalStatus
