import { darken, transparentize } from 'polished'

import styled from '../../utils/styled'

export const TeamInfobox = styled('div')`
  position: relative;
  background: ${props => transparentize(0.1, props.theme.colors.black)};
  overflow: hidden;
  border-radius: 8px;
  color: ${props => darken(0.25, props.theme.colors.white)};
`

export const TeamInfoboxBlurBackground = styled('img')`
  position: absolute;
  top: -12.5%;
  left: -12.5%;
  width: 125%;
  height: 125%;
  filter: blur(25px);
  object-fit: cover;
  opacity: 0.35;
  background-repeat: no-repeat;
  z-index: 1;
`

export const TeamInfoboxInner = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
  z-index: 2;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`

export const TeamLogo = styled('img')`
  display: block;
  flex-shrink: 0;
  width: 180px;
  height: 128px;
  padding: 1rem;
  background: ${props => transparentize(0.1, props.theme.colors.black)};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
  object-fit: contain;
  border-radius: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.3);
  border-image: initial;
`

export const TeamInfoboxHeading = styled('div')`
  flex: 1 1 100%;
  margin: 1.5rem 0 0;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 0 1.5rem;
    text-align: left;
  }
`

export const TeamName = styled('h1')`
  margin: 0;
  color: ${props => props.theme.colors.white};
  font-weight: 500;
`
