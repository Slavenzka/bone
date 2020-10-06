import React from 'react'
import css from './ModalWallet.module.scss'
import Heading from 'components/Heading/Heading'
import IconTrustWallet from 'assets/icons/IconTrustWallet'
import IconMetamask from 'assets/icons/IconMetamask'
import { connectWallet } from 'store/actions/data'
import { useDispatch } from 'react-redux'

const ModalWallet = () => {
  const wallets = [
    {
      label: 'Trust wallet',
      value: `trustWallet`,
      icon: <IconTrustWallet className={css.icon} />,
    },
    {
      label: 'Metamask',
      value: `metamask`,
      icon: <IconMetamask className={css.icon} />,
    },
  ]

  const dispatch = useDispatch()

  const handleWalletClick = walletType => {
    dispatch(connectWallet(walletType))
  }

  return (
    <>
      <Heading
        className={css.heading}
        label='Connect Wallet'
        tag='h2'
      />
      <ul className={css.list}>
        {wallets.map(({ label, icon, value }, index) => {
          return (
            <li className={css.item} key={`Wallet item#${index}`}>
              <button
                className={css.button}
                onClick={() => handleWalletClick(value)}
                type='button'
              >
                {icon || <span>{ label }</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ModalWallet
