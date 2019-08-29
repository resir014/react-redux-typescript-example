import styled from '../../utils/styled'

export const HeroStats = styled('div')`
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

export const HeroStatsInner = styled('div')`
  display: flex;
`

export interface StatAttributeProps {
  attr: 'str' | 'agi' | 'int'
  isPrimaryAttr?: boolean
}

export const StatAttribute = styled('div')<StatAttributeProps>`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  padding: 0 1rem;
  font-size: 0.8rem;
  color: ${props => props.isPrimaryAttr && props.theme.colors.attrs[props.attr]};
`

export interface BulletProps {
  attr: 'str' | 'agi' | 'int'
}

export const Bullet = styled('div')<BulletProps>`
  flex-shrink: 0;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.attrs[props.attr]};
`
