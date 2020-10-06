import React, { useRef } from 'react'
import css from './Home.module.scss'
import classnames from 'classnames'
import Container from 'components/Grid/Container'
import ContainerInner from 'components/Grid/ContainerInner'
import Logo from 'components/Logo/Logo'
import { DeviceTypes, LangOptions, Themes } from 'utils/const'
import { useDispatch, useSelector } from 'react-redux'
import { setLang, toggleModal } from 'store/actions'
import Heading from 'components/Heading/Heading'
import ExchangeIntroForm from 'components/ExchangeIntroForm/ExchangeIntroForm'
import Button, { ButtonTypes } from 'components/Button/Button'
import Summary from 'components/Summary/Summary'
import Footer from 'components/Footer/Footer'
// import Modal from 'components/Modal/Modal'
import Navigation from 'components/Navigation/Navigation'
import Select, { SelectStyleTypes } from 'components/Select/SelectStandard'
import Modal from 'components/Modal/Modal'

const Home = () => {
  const summaryRef = useRef(null)
  const lang = useSelector(state => state.ui.lang)
  const deviceType = useSelector(state => state.elastic.deviceType)
  const theme = useSelector(state => state.ui.theme)
  const userWallet = useSelector(state => state.data.userWallet)
  const dispatch = useDispatch()
  const availableLangOptions = LangOptions
    .filter(langOption => langOption.value !== lang.value)

  const createSummaryRef = node => summaryRef.current = node

  const handleLangChange = evt => {
    dispatch(setLang(evt))
  }

  const handleBurgerClick = () => {
    dispatch(toggleModal(true, <Navigation />))
  }

  const handleClickScroll = () => {
    const target = summaryRef.current
    const scrollDistance = target.getBoundingClientRect().top + window.pageYOffset

    window.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    })
  }

  return (
    <Container className={css.wrapper}>
      <section>
        <ContainerInner className={css.calculator}>
          <header className={css.header}>
            <Logo />
            <Select
              className={css.selectLang}
              options={availableLangOptions}
              value={lang}
              defaultValue={lang}
              onChange={handleLangChange}
              type={SelectStyleTypes.LANG}
            />
            {deviceType === DeviceTypes.ADAPTIVE &&
              <>
                <button
                  className={css.buttonScroll}
                  onClick={handleClickScroll}
                  type='button'
                >
                  Rates
                </button>
                <Button
                  label='Toggle adaptive menu visibility'
                  buttonStyle={ButtonTypes.BURGER}
                  onClick={handleBurgerClick}
                />
              </>
            }
          </header>
          <div className={css.content}>
            <Heading label='Smart Exchange' />
            {userWallet &&
              <p className={css.wallet}>
                { `You have connected wallet: ${userWallet}` }
              </p>
            }
            <ExchangeIntroForm
              deviceType={deviceType}
              className={css.form}
            />
          </div>
          <Modal />
        </ContainerInner>
      </section>
      <aside
        ref={createSummaryRef}
        className={classnames(css.aside, {
          [css.themeLight]: theme === Themes.LIGHT,
          [css.themeDark]: theme === Themes.DARK
        })}
      >
        <ContainerInner className={css.navigation}>
          {deviceType === DeviceTypes.DESKTOP &&
            <header className={css.header}>
              <Navigation />
            </header>
          }
          <Summary className={css.summary} deviceType={deviceType} />
          <Footer className={css.footer} />
        </ContainerInner>
      </aside>
    </Container>
  )
}

export default Home
