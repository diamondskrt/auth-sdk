import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/ru'

dayjs.extend(LocalizedFormat)

export { dayjs }
