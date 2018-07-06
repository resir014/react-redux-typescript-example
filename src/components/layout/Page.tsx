import styled from '../../utils/styled'

const Page = styled('div')`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  padding: ${props => props.theme.containerPadding};
  padding-bottom: 3rem;
`

export default Page
