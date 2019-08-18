import { injectGlobal } from 'react-emotion'
import normalize from './normalize'
import globals from './globals'

injectGlobal`
  ${normalize}
  ${globals}
`
