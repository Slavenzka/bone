import React from 'react'
import css from './SwapStructure.module.scss'
import { useSelector } from 'react-redux'
import classnames from 'classnames'

const SwapStructure = () => {
  const estimation = useSelector(state => state.data.exchangeEstimate) || {}
  const { protocols } = estimation

  if (!protocols || protocols.length === 0) return null

  const renderExchanges = () => protocols[0][0].map(({name, part}, index) => (
    <li
      className={classnames(css.item, {
        [css.itemOdd]: index % 1 === 0
      })}
      key={index}
    >
      <span className={css.name}>
        { name }
      </span>
      <span className={css.part}>
        { `${part} %` }
      </span>
    </li>
  ))

  return (
    <div className={css.wrapper}>
      <h2
        className={css.heading}
      >
        Exchangers shares for your transaction:
      </h2>
      <ul className={css.list}>
        { renderExchanges() }
      </ul>
    </div>
  )
}

export default SwapStructure
