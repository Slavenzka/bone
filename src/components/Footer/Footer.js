import React from 'react'
import css from './Footer.module.scss'
import { HOME_PAGE } from 'Pages/Routes'
import { Link } from 'react-router-dom'
import Social from 'components/Social/Social'
import classnames from 'classnames'

const Footer = ({ className }) => {
  const footerLinks = [
    {
      label: 'How it works',
      url: HOME_PAGE
    },
    {
      label: 'Analytics',
      url: HOME_PAGE
    },
    {
      label: 'Contacts',
      url: HOME_PAGE
    },
    {
      label: 'Privacy Policy',
      url: HOME_PAGE
    },
  ]

  const navlist = (
    <ul className={css.list}>
      {footerLinks.map(({ label, url }, index) => (
        <li
          className={css.item}
          key={`Footer nav link#${index}`}
        >
          <Link className={css.link} to={url}>
            { label }
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <footer className={classnames(css.footer, className)}>
      <Social />
      <div className={css.navigation}>
        { navlist }
      </div>
      <p className={css.copyright}>
        © 2020 Bone. All rights reserved
      </p>
    </footer>
  )
}

export default Footer
