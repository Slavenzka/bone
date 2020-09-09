import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { setDeviceType, setFontSize } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'utils'
import { isBrowser, isTablet, isMobileOnly } from 'react-device-detect'
import { DeviceTypes } from 'utils/const'

// hoc for html font size adjustment in correspondence with user's screen width
const ElasticAdaptive = ({ children }) => {
  const state = useSelector(state => state.elastic.config)
  const type = useSelector(state => state.elastic.deviceType)
  const dispatch = useDispatch()

  useEffect(() => {
    getDeviceType()
    type && changeSize()
    window.addEventListener('resize', debounce(changeSize))
    window.addEventListener('orientationchange', debounce(changeSize))

    return () => {
      window.removeEventListener('resize', debounce(changeSize))
      window.removeEventListener('orientationchange', debounce(changeSize))
    }
  })

  const getDeviceType = () => {
    if (isBrowser) {
      dispatch(setDeviceType(DeviceTypes.DESKTOP))
    }

    if (isTablet || isMobileOnly) {
      dispatch(setDeviceType(DeviceTypes.ADAPTIVE))
    }
  }

  const changeSize = () => {
    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth
    getDeviceType()
    if (type) {
      const html = document.documentElement
      const {widthLimit, baseWidth} = state[type]
      let {baseSize} = state[type]
      let actualWidth = width

      if (widthLimit) {
        actualWidth = Math.min(width, widthLimit)
      }

      const currentSize = actualWidth / baseWidth * baseSize
      dispatch(setFontSize(currentSize))
      html.style.fontSize = currentSize + 'px'
    }
  }

  return children
}

export default withRouter(ElasticAdaptive)
