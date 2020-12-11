import React from 'react'
import css from './Social.module.scss'
import Link from 'components/Link/Link'
import IconTelegram from 'assets/icons/IconTelegram'
import IconTwitter from 'assets/icons/IconTwitter'
import IconReddit from 'assets/icons/IconReddit'
import classnames from 'classnames'
import IconFacebook from 'assets/icons/IconFacebook'
import IconMedium from 'assets/icons/IconMedium'

const Social = () => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <Link link='https://t.me/boneexchange' className={css.link} target='_blank'>
          Telegram
          <IconTelegram className={css.icon} />
        </Link>
      </li>
      <li className={css.item}>
        <Link link='https://twitter.com/boneexchange' className={css.link} target='_blank'>
          Twitter
          <IconTwitter className={css.icon} />
        </Link>
      </li>
      <li className={css.item} style={{ padding: '0.5rem' }}>
        <Link link='https://www.reddit.com/user/boneexchange/' className={css.link} target='_blank'>
          Reddit
          <IconReddit className={classnames(css.icon, css.iconSmall)} />
        </Link>
      </li>
      <li className={css.item} style={{ padding: '0.5rem' }}>
        <Link link='#' className={css.link} target='_blank'>
          Medium
          <IconMedium className={classnames(css.icon, css.iconSmall)} />
        </Link>
      </li>
      <li className={css.item} style={{ padding: '0.5rem' }}>
        <Link link='https://www.facebook.com/Bone-Exchange-110274040906949' className={css.link} target='_blank'>
          Facebook
          <IconFacebook className={classnames(css.icon, css.iconSmall)} />
        </Link>
      </li>
    </ul>
  )
}

export default Social
