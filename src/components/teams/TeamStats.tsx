import styled from '../../utils/styled'

export const TeamStats = styled('div')`
  display: block;
  max-width: 340px;
  margin: 1.5rem 0 0;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 8px;
  padding: 12px;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 0;
    flex: 1 0 340px;
  }
`

export const TeamStatsInner = styled('div')`
  display: flex;
`

export const StatItem = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  padding: 0 1rem;
  font-size: 0.8rem;
`

export const StatHeading = styled('h4')`
  margin: 0;
  margin-bottom: 0.2rem;
  font-size: 1rem;
`

export interface StatNumberProps {
  attr?: 'win' | 'loss'
}

export const StatNumber = styled('p')<StatNumberProps>`
  margin: 0;
  font-size: 1.5rem;
  color: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.attr ? (props.attr === 'win' ? props.theme.colors.attrs.agi : props.theme.colors.attrs.str) : undefined};
`
