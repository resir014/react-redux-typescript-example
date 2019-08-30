import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styled from '../../utils/styled'

import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState } from '../../store'
import { TeamSelectedPayload } from '../../store/teams/types'
import { selectTeam as selectTeamAction, clearSelected as clearSelectedAction } from '../../store/teams/actions'
import DataTable from '../../components/layout/DataTable'
import {
  TeamInfobox,
  TeamInfoboxBlurBackground,
  TeamInfoboxInner,
  TeamLogo,
  TeamInfoboxHeading,
  TeamName
} from '../../components/teams/TeamInfobox'
import { TeamStats, TeamStatsInner, StatItem, StatHeading, StatNumber } from '../../components/teams/TeamStats'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  selected?: TeamSelectedPayload
  errors?: string
}

interface PropsFromDispatch {
  selectTeam: typeof selectTeamAction
  clearSelected: typeof clearSelectedAction
}

interface RouteParams {
  id: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>

const formatPlayerIcon = (accountId: number) => `https://www.opendota.com/assets/images/dota2/players/${accountId}.png`

class ShowTeamsPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { match, selectTeam } = this.props

    selectTeam(match.params.id)
  }

  public componentWillUnmount() {
    const { clearSelected } = this.props

    // clear selected team state before leaving the page
    clearSelected()
  }

  public render() {
    const { selected, loading } = this.props

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
                {selected.detail && (
                  <TeamInfobox>
                    <TeamInfoboxBlurBackground src={selected.detail.logo_url} />
                    <TeamInfoboxInner>
                      {selected.detail.logo_url && <TeamLogo src={selected.detail.logo_url} alt={selected.detail.tag} />}
                      <TeamInfoboxHeading>
                        <TeamName>{selected.detail.name}</TeamName>
                      </TeamInfoboxHeading>
                      <TeamStats>
                        <TeamStatsInner>
                          <StatItem>
                            <StatHeading>Wins</StatHeading>
                            <StatNumber attr="win">{selected.detail.wins}</StatNumber>
                          </StatItem>
                          <StatItem>
                            <StatHeading>Losses</StatHeading>
                            <StatNumber attr="loss">{selected.detail.losses}</StatNumber>
                          </StatItem>
                          <StatItem>
                            <StatHeading>Rating</StatHeading>
                            <StatNumber>{selected.detail.rating.toFixed(0)}</StatNumber>
                          </StatItem>
                        </TeamStatsInner>
                      </TeamStats>
                    </TeamInfoboxInner>
                  </TeamInfobox>
                )}
                {selected.players && (
                  <TableWrapper>
                    <h2>Current players</h2>
                    <DataTable columns={['Name', 'Games', 'Winrate']} widths={['auto', '', '']}>
                      {selected.players
                        .filter(player => player.is_current_team_member === true)
                        .map(player => (
                          <tr key={player.account_id}>
                            <PlayerDetail>
                              <PlayerIcon>
                                <img src={formatPlayerIcon(player.account_id)} alt={player.name} />
                              </PlayerIcon>
                              <PlayerName>{player.name}</PlayerName>
                            </PlayerDetail>
                            <td>{player.games_played}</td>
                            <td>{player.wins}</td>
                          </tr>
                        ))}
                    </DataTable>
                  </TableWrapper>
                )}
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
const mapStateToProps = ({ teams }: ApplicationState) => ({
  loading: teams.loading,
  errors: teams.errors,
  selected: teams.selected
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps: PropsFromDispatch = {
  selectTeam: selectTeamAction,
  clearSelected: clearSelectedAction
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowTeamsPage)

const Wrapper = styled('div')`
  position: relative;
`

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  margin-top: 3rem;
  min-height: 200px;
`

const PlayerDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PlayerIcon = styled('div')`
  position: relative;
  width: 32px;
  height: 32px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const PlayerName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`
