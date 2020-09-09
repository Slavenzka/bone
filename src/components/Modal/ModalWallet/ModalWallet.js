import React from 'react'
import css from './ModalWallet.module.scss'
import Heading from 'components/Heading/Heading'
import IconTrustWallet from 'assets/icons/IconTrustWallet'
import { HOME_PAGE } from 'Pages/Routes'
import { Link } from 'react-router-dom'
import IconMetamask from 'assets/icons/IconMetamask'

const ModalWallet = () => {
  const wallets = [
    {
      label: 'Trust wallet',
      icon: <IconTrustWallet className={css.icon} />,
      url: HOME_PAGE
    },
    {
      label: 'Metamask',
      icon: <IconMetamask className={css.icon} />,
      url: HOME_PAGE
    },
  ]

  return (
    <>
      <Heading
        className={css.heading}
        label='Connect Wallet'
        tag='h2'
      />
      <ul className={css.list}>
        {wallets.map(({ label, icon, url }, index) => {
          return (
            <li className={css.item} key={`Wallet item#${index}`}>
              <Link className={css.link} to={url}>
                {icon || <span>{ label }</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ModalWallet
