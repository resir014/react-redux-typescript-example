import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState } from '../../store'
import { Hero } from '../../store/heroes/types'
import { fetchRequest } from '../../store/heroes/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Hero[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { fetchRequest: fr } = this.props
    fr()
  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <DataTable columns={['Hero', 'Pro Picks/Bans*', 'Pro Wins*']} widths={['auto', '', '']}>
        {loading && data.length === 0 && (
          <HeroLoading>
            <td colSpan={3}>Loading...</td>
          </HeroLoading>
        )}
        {data.map(hero => (
          <tr key={hero.id}>
            <HeroDetail>
              <HeroIcon src={API_ENDPOINT + hero.icon} alt={hero.name} />
              <HeroName>
                <Link to={`/heroes/${hero.name}`}>{hero.localized_name}</Link>
              </HeroName>
            </HeroDetail>
            <td>
              {hero.pro_pick || 0} / {hero.pro_ban || 0}
            </td>
            <td>{hero.pro_win || 0}</td>
          </tr>
        ))}
      </DataTable>
    )
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <p>
              <small>*in last 30 days</small>
            </p>
            {this.renderData()}
          </TableWrapper>
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
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroesIndexPage)

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`

const HeroDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeroIcon = styled('img')`
  width: 32px;
  height: 32px;
`

const HeroName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`

const HeroLoading = styled('tr')`
  td {
    height: 48px;
    text-align: center;
  }
`
