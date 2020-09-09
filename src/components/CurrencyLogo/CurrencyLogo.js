import React from 'react'
import css from './CurrencyLogo.module.scss'
import classnames from 'classnames'
import IconBitcoin from 'assets/icons/IconBitcoin'
import IconEthereum from 'assets/icons/IconEthereum'

export const CurrencyTypes = {
  BITCOIN: 'BTC',
  ETHEREUM: 'ETH'
}

const CurrencyLogo = ({
  className,
  type = CurrencyTypes.BITCOIN
}) => {
  let icon = <IconBitcoin className={css.icon} />

  if (type === CurrencyTypes.ETHEREUM) {
    icon = <IconEthereum className={css.icon} />
  }

  return (
    <div className={classnames(css.wrapper, className)}>
      { icon }
    </div>
  )
}

export default CurrencyLogo
