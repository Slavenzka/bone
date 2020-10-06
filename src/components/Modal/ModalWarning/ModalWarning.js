import React from 'react'
import css from './ModalWarning.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'

const ModalWarning = ({ className, label, url, walletType }) => {
  const dispatch = useDispatch()

  const handleClickConnectWallet = () => {
    dispatch(toggleModal(true, <ModalWallet />))
  }

  return (
    <div className={css.wrapper}>
      <p
        className={classnames(css.message, className)}
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {url &&
        <Button
          className={css.link}
          url={url}
          label={ `Go to extension page` }
          target='_blank'
        />
      }
      <Button
        className={css.button}
        label={ `Choose wallet again` }
        onClick={handleClickConnectWallet}
      />
    </div>
  )
}

export default ModalWarning
