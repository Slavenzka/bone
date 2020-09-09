import React, { useEffect, useRef } from 'react'
import css from './Modal.module.scss'
import IconClose from 'assets/icons/IconClose'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { toggleModal } from 'store/actions'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { DeviceTypes } from 'utils/const'

const Modal = () => {
  const modalRef = useRef(null)
  const modal = useSelector(state => state.ui.modal)
  const deviceType = useSelector(state => state.elastic.deviceType)
  const { status, content } = modal
  const dispatch = useDispatch()

  const createModalRef = node => modalRef.current = node

  useEffect(() => {
    if (status && deviceType === DeviceTypes.ADAPTIVE) {
      console.log(modalRef.current)
      disableBodyScroll(modalRef.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [status, deviceType])

  const handleClickCloseModal = () => {
    dispatch(toggleModal(false, null))
  }

  return (
    <div
      className={classnames(css.wrapper, {
        [css.wrapperOpened]: status
      })}
      ref={createModalRef}
    >
      <button
        className={css.buttonClose}
        type='button'
        onClick={handleClickCloseModal}
      >
        Close modal
        <IconClose className={css.iconClose} />
      </button>
      { content }
    </div>
  )
}

export default Modal
