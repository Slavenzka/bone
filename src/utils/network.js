import React from 'react'
import { toggleModal } from 'store/actions'
import ModalWarning from 'components/Modal/ModalWarning/ModalWarning'

export function handleResponse ({
  response,
  error,
  dispatch,
  title = 'Something went wrong',
  descriptor = 'Operation could not be executed due to unidentified server error',
  buttonLabel = 'Go back',
  handleClickButton,
  handleError,
  isSuccessModalRequired = true,
  handleSuccess
}) {
  if (!error) {
    // const fetchedData = response?.data?.result
    const error = response?.data?.error

    if (error) {
      dispatch(toggleModal(true, (
        <ModalWarning
          title={title}
          label={descriptor}
          repeatLabel={buttonLabel}
          handleClickRepeat={() => {
            dispatch(toggleModal(false, null))
            handleClickButton && handleClickButton()
          }}
        />
      )))
      handleError && handleError()
    } else {
      handleSuccess && handleSuccess()
    }
  } else {
    dispatch(toggleModal(true, (
      <ModalWarning
        title={title}
        label={descriptor}
        repeatLabel={buttonLabel}
        handleClickRepeat={() => {
          dispatch(toggleModal(false, null))
          handleClickButton && handleClickButton()
        }}
      />
    )))
    handleError && handleError()
  }
}
