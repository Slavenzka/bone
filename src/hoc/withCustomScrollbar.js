import React from 'react'
import SimpleBar from 'simplebar-react'

const withCustomScrollbar = (WrappedComponent) => {
  return (props) => {
    return (
      <SimpleBar
        style={{
          height: 'calc(100vh - 6rem)',
          marginTop: '-2.5rem',
          paddingTop: '2.5rem',
          paddingBottom: '4rem',
        }}
        autoHide={false}
      >
        <WrappedComponent {...props} />
      </SimpleBar>
    )
  }
}

export default withCustomScrollbar
