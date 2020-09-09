import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosHugs from 'axiosHugs'
import {
  saveData,
  setBasicFilterProperty,
  setBasicFilterValue,
  setDetailedFilter
} from 'store/actions'

const withDataFetching = (WrappedComponent, options) => {
  return (props) => {
    const [fetchStatus, setFetchStatus] = useState({
      isLoading: false,
      isLoaded: false,
      dataLength: 0
    })
    const {isLoading, isLoaded, dataLength} = fetchStatus
    const dispatch = useDispatch()

    useEffect(() => {
      const {
        page,
        url,
        filters: filtersFunction,
        itemLink
      } = options

      setFetchStatus(state => ({
        ...state,
        isLoading: true
      }))
      axiosHugs.post(`${url}`)
        .then(response => {
          const fetchedData = response.data.result && response.data.result.totalPages
            ? response.data.result.content
            : response.data.result || []
          const data = itemLink.isRequired
            ? fetchedData.map(item => ({ ...item, url: itemLink.propertyToLink ? itemLink.pageToLink(item[itemLink.propertyToLink]) : itemLink.pageToLink()}))
            : fetchedData
          dispatch(saveData(data, true))

          if (filtersFunction) {
            const filters = filtersFunction(data)
            const defaultFilterValue = filters.basic.list.find(item => item.defaultFilter).value
            const detailedFilter = filters.detailed
            dispatch(setBasicFilterProperty(page, filters.basic.property))
            dispatch(setBasicFilterValue(defaultFilterValue))
            dispatch(setDetailedFilter(detailedFilter))
          }
          setFetchStatus({
            isLoading: false,
            isLoaded: true,
            dataLength: response.data.result ? response.data.result.content.length : 0
          })
        })
        .catch(error => {
          setFetchStatus({
            isLoading: false,
            isLoaded: false,
            dataLength: 0
          })
          throw new Error(error)
        })
    }, [dispatch])

    return (
      <>
        <WrappedComponent {...props} isLoading={isLoading} isLoaded={isLoaded} dataLength={dataLength} />
      </>
    )
  }
}

export default withDataFetching
