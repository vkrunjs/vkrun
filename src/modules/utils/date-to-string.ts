import * as type from '../types'

export const dateToString = (date: Date, type: type.DateToStringTypes, timestamp?: 'UTC' | 'local'): string => {
  const year = timestamp === 'UTC' ? date.getUTCFullYear() : date.getFullYear()
  const month = (timestamp === 'UTC' ? date.getUTCMonth() + 1 : date.getMonth() + 1).toString().padStart(2, '0')
  const day = (timestamp === 'UTC' ? date.getUTCDate() : date.getDate()).toString().padStart(2, '0')
  const hours = (timestamp === 'UTC' ? date.getUTCHours() : date.getHours()).toString().padStart(2, '0')
  const minutes = (timestamp === 'UTC' ? date.getUTCMinutes() : date.getMinutes()).toString().padStart(2, '0')
  const seconds = (timestamp === 'UTC' ? date.getUTCSeconds() : date.getSeconds()).toString().padStart(2, '0')
  const milliseconds = (timestamp === 'UTC' ? date.getUTCMilliseconds() : date.getMilliseconds()).toString().padStart(3, '0')

  if (type === 'YYYY/MM/DD HH:MM:SS.MS') {
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
  } else if (type === 'YYYY/MM/DD HH:MM:SS') {
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  } else if (type === 'YYYY/MM/DD HH:MM') {
    return `${year}/${month}/${day} ${hours}:${minutes}`
  } else if (type === 'YYYY/MM/DD') {
    return `${year}/${month}/${day}`
  } else if (type === 'YYYY/DD/MM HH:MM:SS.MS') {
    return `${year}/${day}/${month} ${hours}:${minutes}:${seconds}.${milliseconds}`
  } else if (type === 'YYYY/DD/MM HH:MM:SS') {
    return `${year}/${day}/${month} ${hours}:${minutes}:${seconds}`
  } else if (type === 'YYYY/DD/MM HH:MM') {
    return `${year}/${day}/${month} ${hours}:${minutes}`
  } else if (type === 'YYYY/DD/MM') {
    return `${year}/${day}/${month}`
  } else if (type === 'MM/DD/YYYY HH:MM:SS.MS') {
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}.${milliseconds}`
  } else if (type === 'MM/DD/YYYY HH:MM:SS') {
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
  } else if (type === 'MM/DD/YYYY HH:MM') {
    return `${month}/${day}/${year} ${hours}:${minutes}`
  } else if (type === 'MM/DD/YYYY') {
    return `${month}/${day}/${year}`
  } else if (type === 'DD/MM/YYYY HH:MM:SS.MS') {
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}.${milliseconds}`
  } else if (type === 'DD/MM/YYYY HH:MM:SS') {
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  } else if (type === 'DD/MM/YYYY HH:MM') {
    return `${day}/${month}/${year} ${hours}:${minutes}`
  } else if (type === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`
  } else if (type === 'HH:MM:SS.MS') {
    return `${hours}:${minutes}:${seconds}.${milliseconds}`
  } else if (type === 'HH:MM:SS') {
    return `${hours}:${minutes}:${seconds}`
  } else if (type === 'HH:MM') {
    return `${hours}:${minutes}`
  }
  return `${year}/${day}/${month} ${hours}:${minutes}:${seconds}.${milliseconds}`
}
