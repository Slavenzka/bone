import React from 'react'
import css from './Logo.module.scss'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import IconLogo from 'assets/icons/IconLogo'

const Logo = ({
  className,
  url
}) => {
  return url
    ? (
      <Link className={classnames(css.link, className)} to={url}>
        <p className={css.logo}>
          <IconLogo className={css.icon} />
        </p>
      </Link>
    )
    : (
      <p className={classnames(css.logo, className)}>
        <IconLogo className={css.icon} />
      </p>
    )
}

export default Logo
