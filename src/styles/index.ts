import { injectGlobal } from 'react-emotion'
import normalize from './normalize'
import globals from './globals'

/* eslint-disable no-unused-expressions */
injectGlobal`
  ${normalize}
  ${globals}
`
