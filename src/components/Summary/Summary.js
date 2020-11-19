import React, { useEffect, useState } from 'react'
import css from './Summary.module.scss'
import classnames from 'classnames'
import SimpleBar from 'simplebar-react'
import { DeviceTypes } from 'utils/const'
import axios from 'axios'
import spinner from 'assets/images/Spinner.gif'

const Summary = ({
  className,
  deviceType,
}) => {
  const [isFetching, updateFetchingStatus] = useState(false)
  const [fetchedData, updateFetchedData] = useState(null)

  useEffect(() => {

    updateFetchingStatus(true)
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        setTimeout(() => {
          updateFetchingStatus(false)
        }, 3000)
        const fetchedData = response.data.filter(item => (
          item.id === 'ethereum' ||
          item.id === 'tether' ||
          item.id === 'usd-coin' ||
          item.id === 'dai'
        ))

        updateFetchedData(fetchedData)
      })
      .catch(error => {
        updateFetchingStatus(false)
      })
  }, [])


  const renderTable = () => (
    <table className={css.table}>
      <tbody>
      <tr>
        <th className={css.heading}>
          Token
        </th>
        <th className={css.heading}>
          Last price
        </th>
        <th className={css.heading}>
          Day-to-day change
        </th>
        <th className={css.heading}>
          Max. price
        </th>
        <th className={css.heading}>
          Min. price
        </th>
      </tr>
      {fetchedData.map(({
        id,
        symbol,
        current_price,
        price_change_percentage_24h,
        high_24h,
        low_24h
      }, index) => (
          <tr
            className={css.rowData}
            key={`Table row#${index}`}
          >
            <td className={css.cell}>
              { `${id.toUpperCase()} (${symbol.toUpperCase()})` }
            </td>
            <td className={css.cell}>
              { `$ ${current_price >= 1 ? current_price.toFixed(2) : current_price.toFixed(4)}` }
            </td>
            <td className={css.cell}>
              <span
                className={classnames(css.change, {
                  [css.changeRise]: price_change_percentage_24h > 0,
                  [css.changeFall]: price_change_percentage_24h < 0
                })}
              >
                { `${Math.abs(price_change_percentage_24h).toFixed(2)} %` }
              </span>
            </td>
            <td className={css.cell}>
              { `$ ${high_24h >= 1 ? high_24h.toFixed(2) : high_24h.toFixed(4)}` }
            </td>
            <td className={css.cell}>
              { `$ ${low_24h >= 1 ? low_24h.toFixed(2) : low_24h.toFixed(4)}` }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  let content = (
    <img
      className={css.skull}
      src={spinner}
      alt='Bone spinner'
    />
  )

  if (!isFetching && !fetchedData) {
    content = null
  }

  if (!isFetching && fetchedData) {
    content = deviceType === DeviceTypes.DESKTOP
      ? renderTable()
      : (
        <div className={css.tableAdaptiveWrapper}>
          <SimpleBar
            style={{
              maxWidth: '32rem',
            }}
            autoHide={false}
          >
            { renderTable() }
          </SimpleBar>
        </div>
      )
  }


  return (
    <div className={classnames(css.wrapper, className)}>
      <p className={css.total}>
        Market results for popular tokens for the last 24 hours
      </p>
      { content }
    </div>
  )
}

export default Summary
