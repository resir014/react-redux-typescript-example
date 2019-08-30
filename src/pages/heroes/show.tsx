import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  HeroInfobox,
  HeroInfoboxImage,
  HeroInfoboxHeading,
  HeroInfoboxInner,
  HeroInfoboxBlurBackground,
  HeroName,
  HeroRoles
} from '../../components/heroes/HeroInfobox'
import { HeroStats, HeroStatsInner, StatAttribute, Bullet } from '../../components/heroes/HeroStats'
import { HeroDetails, HeroDetailsColumn, HeroDetailsRow, HeroDetailsAttrName } from '../../components/heroes/HeroDetails'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'

import { ApplicationState } from '../../store'
import { Hero } from '../../store/heroes/types'
import { fetchRequest } from '../../store/heroes/actions'
import styled from '../../utils/styled'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Hero[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchHeroes: typeof fetchRequest
}

interface RouteParams {
  name: string
}

interface State {
  selected?: Hero
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'

const Wrapper = styled('div')`
  position: relative;
`

class ShowHeroesPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props)

    this.state = {}
  }

  public componentDidMount() {
    const { data, fetchHeroes } = this.props

    if (!data || data.length === 0) {
      fetchHeroes()
    }
  }

  public render() {
    const { data, loading, match } = this.props
    const selected = data.find(hero => hero.name === match.params.name)

    return (
      <Page>
        <Container>
          <Wrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {selected && (
              <>
                <HeroInfobox>
                  <HeroInfoboxBlurBackground src={API_ENDPOINT + selected.img} />
                  <HeroInfoboxInner>
                    <HeroInfoboxImage src={API_ENDPOINT + selected.img} />
                    <HeroInfoboxHeading>
                      <HeroName>{selected.localized_name}</HeroName>
                      <HeroRoles>
                        {selected.attack_type} - <span>{selected.roles.join(', ')}</span>
                      </HeroRoles>
                    </HeroInfoboxHeading>
                    <HeroStats>
                      <HeroStatsInner>
                        <StatAttribute attr="str" isPrimaryAttr={selected.primary_attr === 'str'}>
                          <Bullet attr="str" /> {selected.base_str || 0} + {selected.str_gain || 0}
                        </StatAttribute>
                        <StatAttribute attr="agi" isPrimaryAttr={selected.primary_attr === 'agi'}>
                          <Bullet attr="agi" /> {selected.base_agi || 0} + {selected.agi_gain || 0}
                        </StatAttribute>
                        <StatAttribute attr="int" isPrimaryAttr={selected.primary_attr === 'int'}>
                          <Bullet attr="int" /> {selected.base_int || 0} + {selected.int_gain || 0}
                        </StatAttribute>
                      </HeroStatsInner>
                    </HeroStats>
                  </HeroInfoboxInner>
                </HeroInfobox>
                <HeroDetails>
                  <HeroDetailsColumn>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Base Attack:</HeroDetailsAttrName> {selected.base_attack_min} - {selected.base_attack_max}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Attack Range:</HeroDetailsAttrName> {selected.attack_range || '-'}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Attack Speed:</HeroDetailsAttrName> {selected.attack_speed || '-'}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Projectile Speed:</HeroDetailsAttrName> {selected.projectile_speed || '-'}
                    </HeroDetailsRow>
                  </HeroDetailsColumn>
                  <HeroDetailsColumn>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Health:</HeroDetailsAttrName> {selected.base_health || 0}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Health Regen:</HeroDetailsAttrName> {selected.base_health_regen || 0}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Mana:</HeroDetailsAttrName> {selected.base_mana || 0}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Mana Regen:</HeroDetailsAttrName> {selected.base_mana_regen || 0}
                    </HeroDetailsRow>
                  </HeroDetailsColumn>
                  <HeroDetailsColumn>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Base Armor:</HeroDetailsAttrName> -
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Magic Resistance:</HeroDetailsAttrName> {selected.base_mr || 0}%
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Move Speed:</HeroDetailsAttrName> {selected.move_speed || 0}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Turn Speed:</HeroDetailsAttrName> {selected.turn_rate || 0}
                    </HeroDetailsRow>
                  </HeroDetailsColumn>
                  <HeroDetailsColumn>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>Number of Legs:</HeroDetailsAttrName> {selected.legs}
                    </HeroDetailsRow>
                    <HeroDetailsRow>
                      <HeroDetailsAttrName>CM Enabled:</HeroDetailsAttrName> {selected.cm_enabled ? 'yes' : 'no'}
                    </HeroDetailsRow>
                  </HeroDetailsColumn>
                </HeroDetails>
              </>
            )}
          </Wrapper>
        </Container>
      </Page>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchHeroes: fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowHeroesPage)
