import moment from 'moment'

export const sortByDate = payload => {
    console.log(typeof parseInt(moment('2018-10-02T16:14:27.156').format('YYYYMMDD')))
  return  payload.sort((a,b) => parseInt(moment(b.created_at).format('YYYYMMDD')) - parseInt(moment(a.created_at).format('YYYYMMDD')) )
}

export const isAuthenticated = () => {
    const sessionId = localStorage.getItem('userId')
    return sessionId ? true : false
}