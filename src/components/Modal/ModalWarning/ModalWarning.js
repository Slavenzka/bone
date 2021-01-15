import React from 'react'
import css from './ModalWarning.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalWallet from 'components/Modal/ModalWallet/ModalWallet'
import Heading, { HeadingTypes } from 'components/Heading/Heading'

const ModalWarning = ({
  className,
  title,
  label,
  url,
  repeatLabel = `Choose wallet again`,
  handleClickRepeat
}) => {
  const dispatch = useDispatch()

  const handleClickConnectWallet = () => {
    dispatch(toggleModal(true, <ModalWallet />))
  }

  return (
    <div className={css.wrapper}>
      {title &&
        <Heading
          tag='h3'
          className={css.heading}
          color={HeadingTypes.colors.LIGHTEST}
          label={title}
        />
      }
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
        label={repeatLabel}
        onClick={handleClickRepeat || handleClickConnectWallet}
      />
    </div>
  )
}

export default ModalWarning
