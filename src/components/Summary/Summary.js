import React, { useEffect, useState } from 'react'
import css from './Summary.module.scss'
import classnames from 'classnames'
import Tag from 'components/Tag/Tag'
import SimpleBar from 'simplebar-react'
import { DeviceTypes } from 'utils/const'
// import inchLogo from 'assets/images/Summary__logo--1inch.png'
// import pathfinderLogo from 'assets/images/Summary__logo--pathfinder.png'
// import airswapLogo from 'assets/images/Summary__logo--airswap.png'
// import uniswapLogo from 'assets/images/Summary__logo--uniswap.png'
// import oasisLogo from 'assets/images/Summary__logo--oasis.png'
// import kyberLogo from 'assets/images/Summary__logo--kyber.png'
// import kyber2Logo from 'assets/images/Summary__logo--kyber2.png'

const data = [
  {
    exchanger: '1inch',
    logo: '',
    amount: '8.89942446 ETH',
    rates: '29.93563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'Pathfinder',
    logo: '',
    amount: '8.79942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'AirSwap',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'Uniswap',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'Oasis',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: '1inch03',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'Kyber',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
  {
    exchanger: 'Kyber 2',
    logo: '',
    amount: '8.59942446 ETH',
    rates: '29.83563837',
    currency: 'BTC/ETH',
  },
]

const Summary = ({
  className,
  deviceType,
  total = '$ 948 700.67'
}) => {
  const [fetchedData, updateFetchedData] = useState([])

  const processedData = fetchedData.sort((a, b) => a.rates < b.rates)

  const table = (
    <table className={css.table}>
      <tbody>
      <tr>
        <th className={css.heading}>
          Exchager
        </th>
        <th className={css.heading}>
          Amount
        </th>
        <th className={css.heading}>
          Rates
        </th>
      </tr>
      {processedData.map(({ exchanger, logo, amount, rates, currency }, index) => (
          <tr
            className={classnames(css.rowData, {
              [css.rowDataBest]: index === 0
            })}
            key={`Table row#${index}`}
          >
            <td className={classnames(css.cell, {
              [css.cellHighlightened]: index === 0,
            })}>
              {logo && deviceType === DeviceTypes.DESKTOP &&
                <img className={css.logo} src={logo} alt={`Логотип ${exchanger}`} />
              }
              <span className={css.content}>
                { exchanger.toUpperCase() }
                {index === 0 &&
                  <Tag className={css.tag} label='Best' />
                }
              </span>
            </td>
            <td className={classnames(css.cell, {
              [css.cellHighlightened]: index === 0
            })}>
              { amount }
            </td>
            <td className={classnames(css.cell, {
              [css.cellHighlightened]: index === 0
            })}>
              { `${rates} ${currency}` }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  useEffect(() => {
    updateFetchedData(data)
  }, [])

  return (
    <div className={classnames(css.wrapper, className)}>
      {total &&
        <p className={css.total}>
          { 'Total exchange amount completed' }
          <span className={css.quantity}>
            { total }
          </span>
        </p>
      }
      {deviceType === DeviceTypes.DESKTOP
        ? table
        : (
          <div className={css.tableAdaptiveWrapper}>
            <SimpleBar
              style={{
                maxWidth: '32rem',
              }}
              autoHide={false}
            >
              { table }
            </SimpleBar>
          </div>
        )
      }
    </div>
  )
}

export default Summary
