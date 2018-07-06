import styled from '../../utils/styled'
import { transparentize } from 'polished'

const LoadingOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${props => transparentize(0.25, props.theme.colors.background)};
`

export default LoadingOverlay
