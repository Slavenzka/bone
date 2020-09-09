import axios from 'axios'

const axiosHugs = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
})

export default axiosHugs
