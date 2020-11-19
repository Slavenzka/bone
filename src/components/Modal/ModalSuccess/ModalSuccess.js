import React from 'react'
import css from './ModalSuccess.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'

const ModalSuccess = ({ className, data }) => {
  const dispatch = useDispatch()

  const handleClickConfirm = () => {
    dispatch(toggleModal(false, null))
  }

  return (
    <div className={css.wrapper}>
      <p className={classnames(css.message, className)}>
        Token swap was successfully executed. Please, check your wallet details
      </p>
      <Button
        className={css.button}
        label={ `Go back` }
        onClick={handleClickConfirm}
      />
    </div>
  )
}

export default ModalSuccess
