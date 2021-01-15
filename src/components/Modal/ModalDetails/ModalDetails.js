import React, { useEffect, useState } from 'react'
import css from './ModalDetails.module.scss'
import Button from 'components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { saveTxDetailsData, toggleModal } from 'store/actions'
import Heading, { HeadingTypes } from 'components/Heading/Heading'
import axios from 'axios'
import spinner from 'assets/images/Spinner.gif'
import SimpleBar from 'simplebar-react'
import { isMobile } from 'react-device-detect'
import { handleResponse } from 'utils/network'

const ModalDetails = ({ symbol, txHash, amount }) => {
  const dispatch = useDispatch()
  const data = useSelector(store => store.data.txDetailsCash[txHash])
  const [isFetching, setFetchingStatus] = useState(false)

  useEffect(() => {
    if (!data) {
      setFetchingStatus(true)
      axios.get(`https://api.bloxy.info/dex/tx_trades?tx_hash=${txHash}&key=${process.env.REACT_APP_API_KEY_BLOXY}&format=structure`)
        .then(response => {
          setFetchingStatus(false)
          // const fetchedData = response?.data

          handleResponse({
            response,
            dispatch,
            title: `Failed to get transactions details`,
            descriptor: `We are working on restoration of access to data. Please, try again later.`,
            handleSuccess: () => {
              dispatch(saveTxDetailsData(txHash, response.data))
            }
          })
        })
        .catch(() => setFetchingStatus(false))
    }
  }, [data, dispatch, txHash])

  const getTotalProfit = data => {
    const bought = data.reduce((total, {
      buySymbol,
      amountBuy,
      amountBuyInCurrency
    }) => {
      if (buySymbol.toUpperCase() === symbol.toUpperCase()) {
        total.currency += amountBuyInCurrency
        total.tokens += amountBuy
      }

      return total
    }, {
      tokens: 0,
      currency: 0,
    })

    return (amount / bought.tokens * 100).toFixed(2)
  }

  const handleClickConfirm = () => {
    dispatch(toggleModal(false, null))
  }

  const renderContent = () => {
    if (!data && isFetching) {
      return (
        <img
          className={css.skull}
          src={spinner}
          alt='Bone spinner'
        />
      )
    }

    if (data && data.length > 0 && !isFetching) {
      const details = data
        .sort((a, b) => a.tradeIndex - b.tradeIndex)
        .map(({
          tradeIndex,
          buySymbol,
          buy_price,
          amountBuy,
          amountBuyInCurrency,
          sellSymbol,
          sell_price,
          amountSell,
          amountSellInCurrency,
        }, index) => (
          <table className={css.table} key={index}>
            <tbody>
              <tr>
                <th className={css.heading} colSpan={2}>
                  { `Trade #${index + 1}` }
                </th>
              </tr>
              <tr>
                <td className={css.type} colSpan={2}>
                  Sell details
                </td>
              </tr>
              <tr>
                <td className={css.type} colSpan={2}>
                  { `Trade index: ${tradeIndex}` }
                </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Symbol
                  </td>
                  <td className={css.value}>
                    { sellSymbol }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Amount of tokens
                  </td>
                  <td className={css.value}>
                    { amountSell }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Sell price
                  </td>
                  <td className={css.value}>
                    { sell_price }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Amount of USD
                  </td>
                  <td className={css.value}>
                    { amountSellInCurrency }
                  </td>
              </tr>
              <tr>
                <td className={css.type} colSpan={2}>
                  Buy details
                </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Symbol
                  </td>
                  <td className={css.value}>
                    { buySymbol }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Amount of tokens
                  </td>
                  <td className={css.value}>
                    { amountBuy }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Buy price
                  </td>
                  <td className={css.value}>
                    { buy_price }
                  </td>
              </tr>
              <tr className={css.row}>
                  <td className={css.key}>
                    Amount of USD
                  </td>
                  <td className={css.value}>
                    { amountBuyInCurrency }
                  </td>
              </tr>
            </tbody>
          </table>
        ))

      return (
        <>
          <SimpleBar
            style={{
              height: isMobile ? `auto` : `70vh`,
              marginTop: '3rem'
            }}
            autoHide={false}
          >
            <p className={css.profit}>
              { `Transaction total profit: ${getTotalProfit(data)} %` }
            </p>
            { details }
          </SimpleBar>
          <Button
            className={css.button}
            label={ `Close details` }
            onClick={handleClickConfirm}
          />
        </>
      )
    }
  }

  return (
    <div className={css.wrapper}>
      <Heading
        className={css.message}
        size={HeadingTypes.size.SMALL}
        label={`Transaction details for selected ${symbol} arbitrage`}
      />
      { renderContent() }
    </div>
  )
}

export default ModalDetails
