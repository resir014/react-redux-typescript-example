import { injectGlobal } from 'react-emotion'
import normalize from './normalize'
import globals from './globals'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize}
  ${globals}
`
