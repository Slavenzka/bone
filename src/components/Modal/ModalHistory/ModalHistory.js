import React, { useEffect, useState, useRef } from 'react'
import css from './ModalHistory.module.scss'
import { useSelector } from 'react-redux'
import axiosBone from 'axiosBone'
import { OperationTypes } from 'utils/const'
import classnames from 'classnames'
import { formatDate } from 'utils'
import IconReceive from 'assets/icons/IconReceive'
import IconSend from 'assets/icons/IconSend'
import SimpleBar from 'simplebar-react'
import spinner from 'assets/images/Spinner.gif'

const ModalHistory = () => {
  const [data, updateData] = useState(null)
  const [isFetching, updateFetchingStatus] = useState(false)
  const web3 = useSelector(state => state.data.web3)
  const userWallet = useSelector(state => state.data.userWallet)
  const listRef = useRef(null)

  useEffect(() => {
    if (!data && userWallet && web3?.eth) {
      updateFetchingStatus(true)
      web3.eth.getBlockNumber()
        .then(response => {
          axiosBone.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${userWallet}&startblock=0&endblock=${response}&sort=desc&apikey=${'NBJNBX5UUYFZ5476ZES3RWU66SSIH1GENA'}`)
            .then(response => {
              setTimeout(() => {
                updateFetchingStatus(false)
              }, 2000)
              const fetchedData = response?.data?.result

              if (fetchedData) {
                const dataToRender = fetchedData.slice(0, 30).map(item => ({
                  ...item,
                  operationType: item.from === userWallet ? OperationTypes.SEND : OperationTypes.RECEIVE
                }))

                updateData(dataToRender)
              }
            })
        })
    }
  }, [userWallet, data, web3.eth])

  const renderTransactions = data => {
    if (!data) return null

    if (data.length === 0) {
      return (
        <div className={css.last}>
          No transactions found for connected account
        </div>
      )
    }

    const renderIcon = operationType => operationType === OperationTypes.RECEIVE
      ? <IconReceive className={classnames(css.icon, css.iconReceive)} />
      : <IconSend className={classnames(css.icon, css.iconSend)} />

    const items = data.map(({ nonce, operationType, timeStamp, tokenDecimal, tokenSymbol, value }, index) => {
      const isApproval = !Boolean([].concat(data.slice(0, index), data.slice(index + 1)).find(item => item.nonce === nonce))
      return (
        <li
          className={classnames(css.item, {
            [css.itemReceive]: operationType === OperationTypes.RECEIVE && !isApproval,
            [css.itemSend]: operationType === OperationTypes.SEND && !isApproval,
          })}
          key={index}
        >
          { !isApproval && renderIcon(operationType) }
          <span>
            { tokenSymbol }
          </span>
          <span>
            { (value / Math.pow(10, tokenDecimal)).toFixed(2) }
          </span>
          <span>
            { formatDate(timeStamp * 1000).formattedDate }
          </span>
        </li>
      )
    })

    return (
      <SimpleBar
        style={{
          height: 'calc(100vh - 25rem)',
          marginTop: '2rem'
        }}
        autoHide={false}
        ref={listRef}
      >
        <ul className={css.list}>
          { items }
        </ul>
      </SimpleBar>
    )
  }

  return (
   <div className={css.wrapper}>
     <h2 className={css.title}>
       Latest transactions
     </h2>
     <p className={css.account}>
       Account number:
       <span>{ userWallet }</span>
     </p>
     { isFetching
       ? (
         <img
           className={css.skull}
           src={spinner}
           alt='Bone spinner'
         />
       )
       : renderTransactions(data) }
   </div>
  )
}

export default ModalHistory
