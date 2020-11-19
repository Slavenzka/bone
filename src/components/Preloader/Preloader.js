import React from 'react'
import css from './Preloader.module.scss'

export const PreloaderTypes = {
  MAIN: 'MAIN',
  MINIFIED: 'MINIFIED'
}

const Preloader = ({ className, type = PreloaderTypes.MAIN }) => {
  switch (type) {
    case PreloaderTypes.MINIFIED:
      return (
        <div className={className}>
          <svg className={css.iconSmall} viewBox='0 0 128 35' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
            <g>
              <circle fillOpacity='1' cx='17.5' cy='17.5' r='17.5'/>
              <animate attributeName='opacity' dur='2700ms' begin='0s' repeatCount='indefinite' keyTimes='0;0.167;0.5;0.668;1' values='0.3;1;1;0.3;0.3'/>
            </g>
            <g>
              <circle fillOpacity='1' cx='110.5' cy='17.5' r='17.5'/>
              <animate attributeName='opacity' dur='2700ms' begin='0s' repeatCount='indefinite' keyTimes='0;0.334;0.5;0.835;1' values='0.3;0.3;1;1;0.3'/>
            </g>
            <g>
              <circle fillOpacity='1' cx='64' cy='17.5' r='17.5'/>
              <animate attributeName='opacity' dur='2700ms' begin='0s' repeatCount='indefinite' keyTimes='0;0.167;0.334;0.668;0.835;1' values='0.3;0.3;1;1;0.3;0.3'/>
            </g>
          </svg>
        </div>
      )
    default:
      return (
        <div className={className}>
          <svg
            className={css.icon}
            viewBox='0 0 128 128'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            version='1.0'
          >
            <g>
              <circle cx='16' cy='64' r='16' fillOpacity='1'/>
              <circle cx='16' cy='64' r='14.344' fillOpacity='1' transform='rotate(45 64 64)'/>
              <circle cx='16' cy='64' r='12.531' fillOpacity='1' transform='rotate(90 64 64)'/>
              <circle cx='16' cy='64' r='10.75' fillOpacity='1' transform='rotate(135 64 64)'/>
              <circle cx='16' cy='64' r='10.063' fillOpacity='1' transform='rotate(180 64 64)'/>
              <circle cx='16' cy='64' r='8.063' fillOpacity='1' transform='rotate(225 64 64)'/>
              <circle cx='16' cy='64' r='6.438' fillOpacity='1' transform='rotate(270 64 64)'/>
              <circle cx='16' cy='64' r='5.375' fillOpacity='1' transform='rotate(315 64 64)'/>
              <animateTransform
                attributeName='transform'
                type='rotate'
                values='0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64'
                calcMode='discrete'
                dur='880ms'
                repeatCount='indefinite'
              />
            </g>
          </svg>
        </div>
      )
  }
}

export default Preloader
