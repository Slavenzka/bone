import React from 'react'
import css from './Heading.module.scss'
import classnames from 'classnames'

export const HeadingTypes = {
  MAIN: 'main',
  colors: {
    DARK: 'dark',
    LIGHTEST: 'lightest'
  },
  size: {
    SMALL: 'small',
    MEDIUM: 'medium'
  }
}

const Heading = ({
  className,
  label,
  tag = 'h1',
  color = HeadingTypes.MAIN,
  size =  HeadingTypes.MAIN,
  isHidden
}) => {
  const TagName = tag

  return (
    <TagName
      className={classnames(css.heading, className, {
        [css.headingMain]: size === HeadingTypes.MAIN,
        [css.headingDark]: color === HeadingTypes.colors.DARK,
        [css.headingLightest]: color === HeadingTypes.colors.LIGHTEST,
        [css.headingMedium]: size === HeadingTypes.size.MEDIUM,
        [css.headingSmall]: size === HeadingTypes.size.SMALL,
        'visuallyHidden': isHidden
      })}
    >
      { label }
    </TagName>
  )
}

export default Heading
