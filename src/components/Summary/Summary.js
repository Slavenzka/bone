import React, { useEffect, useState } from 'react'
import css from './Summary.module.scss'
import classnames from 'classnames'
import SimpleBar from 'simplebar-react'
import { DeviceTypes } from 'utils/const'
import axios from 'axios'
import spinner from 'assets/images/Spinner.gif'
import { useDispatch } from 'react-redux'
import IconEye from 'assets/icons/IconEye'
import { toggleModal } from 'store/actions'
import ModalDetails from 'components/Modal/ModalDetails/ModalDetails'
import { formatNumbers } from 'utils'
import { handleResponse } from 'utils/network'
import no_arbitrage from 'assets/images/no-arbitrage.png'

const Summary = ({
  className,
  deviceType,
}) => {
  const [isFetching, updateFetchingStatus] = useState(false)
  const [isError, setErrorStatus] = useState(false)
  const [fetchedData, updateFetchedData] = useState(null)
  const dispatch = useDispatch()
  const [emptyRef, setEmptyRef] = useState(null)

  useEffect(() => {
    updateFetchingStatus(true)

    axios.get(`https://api.bloxy.info/dex/arbitrage_trades?key=${process.env.REACT_APP_API_KEY_BLOXY}&format=structure`)
      .then(response => {
        console.log(response)
        updateFetchingStatus(false)

        const fetchedData = response?.data
        handleResponse({
          response,
          dispatch,
          title: `Could not get ERC20 arbitrage data`,
          descriptor: `An error has occurred while fetching arbitrage statistics. We are working on the solution and will restore the functionality soon.`,
          buttonLabel: 'Close',
          handleError: () => setErrorStatus(true)
        })

        if (fetchedData && !response?.data?.error) {
          const processedData = fetchedData
            .sort((a, b) => b[`amount_in_currency`] - a[`amount_in_currency`])
            .filter(item => item.amount !== 0 && item[`amount_in_currency`] !== 0 && item.symbol)

          updateFetchedData(processedData)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch])

  useEffect(() => {
    if (emptyRef) {
      setTimeout(() => {
        emptyRef.classList.add(`${css.emptyVisible}`)
      }, 250)
    }
  }, [emptyRef])


  const renderTable = () => (
    <table className={css.table}>
      <tbody>
      {fetchedData.map(({
        symbol,
        contract_types,
        amount,
        amount_in_currency,
        tx_hash,
      }, index) => (
          <tr
            className={css.rowData}
            key={`Table row#${index}`}
          >
            <td className={css.cell}>
              { symbol.toUpperCase() }
            </td>
            <td className={css.cell}>
              { contract_types }
            </td>
            <td className={css.cell}>
              <span
                className={classnames(css.change)}
              >
                { `${+amount > 999
                  ? formatNumbers(amount)
                  : (+amount).toFixed(2)}`
                }
              </span>
            </td>
            <td className={css.cell}>
              <span
                className={classnames(css.change)}
              >
                { `${+amount_in_currency > 999
                  ? formatNumbers(amount_in_currency)
                  : (+amount_in_currency).toFixed(2)}`
                }
              </span>
            </td>
            <td className={css.cell}>
              <button
                className={css.buttonDetails}
                onClick={() => dispatch(toggleModal(true, (
                  <ModalDetails
                    txHash={tx_hash}
                    symbol={symbol}
                    amount={amount}
                    amountInCurrency={amount_in_currency}
                  />
                )))}
                type='button'
              >
                Show transaction details
                <IconEye className={css.icon} />
              </button>
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

  if (!isFetching && fetchedData && !isError) {
    content = deviceType === DeviceTypes.DESKTOP
      ? (
        <>
          <table className={classnames(css.table, css.tableHeaders)}>
            <tbody>
            <tr>
              <th className={css.heading}>
                Token
              </th>
              <th className={css.heading}>
                Contract types
              </th>
              <th className={css.heading}>
                Transaction <p className={css.tooltip}>ROI<span className={css.tooltipText}>Return On Investment calculated in Tokens</span></p>
              </th>
              <th className={css.heading}>
                Transaction <p className={css.tooltip}>ROI<span className={css.tooltipText}>Return On Investment calculated in USD</span></p>, USD
              </th>
              <th className={css.heading} />
            </tr>
            </tbody>
          </table>
          <SimpleBar
            style={{
              height: `${6.5 * 8}rem`,
            }}
            autoHide={false}
          >
            { renderTable() }
          </SimpleBar>
        </>
      )
      : (
        <div className={css.tableAdaptiveWrapper}>
          <SimpleBar
            style={{
              maxWidth: '32rem',
              height: `${6.5 * 8}rem`,
            }}
            autoHide={false}
          >
            { renderTable() }
          </SimpleBar>
        </div>
      )
  }

  if (isError) {
    content = (
      <img
        className={css.empty}
        src={no_arbitrage}
        alt={'Pointer to the exchanger interface'}
        ref={setEmptyRef}
      />
    )
  }


  return (
    <div className={classnames(css.wrapper, className)}>
      {!isError &&
        <p className={css.total}>
          Daily arbitrage statistics
        </p>
      }
      { content }
    </div>
  )
}

export default Summary
