import React from 'react'
import css from './Social.module.scss'
import { Link } from 'react-router-dom'
import IconDiscord from 'assets/icons/IconDiscord'
import IconTelegram from 'assets/icons/IconTelegram'
import IconTwitter from 'assets/icons/IconTwitter'

const Social = () => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <Link to='#' className={css.link}>
          Telegram
          <IconTelegram className={css.icon} />
        </Link>
      </li>
      <li className={css.item}>
        <Link to='#' className={css.link}>
          Twitter
          <IconTwitter className={css.icon} />
        </Link>
      </li>
      <li className={css.item}>
        <Link to='#' className={css.link}>
          Discord
          <IconDiscord className={css.icon} classInner={css.iconInner} />
        </Link>
      </li>
    </ul>
  )
}

export default Social
