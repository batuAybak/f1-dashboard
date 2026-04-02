import useQuery from '../../api/useQuery'
import TeamList from './TeamList'

/**
 * TeamsPage fetches and displays a list of all teams.
 * Uses TeamList to render each team card.
 */
export default function TeamsPage() {
  // Fetch all teams to show team info and color on cards
  const { data: teams, loadingTeams, errorTeams } = useQuery('/teams', 'teams')
  // Fetch all drivers to show on team cards
  const { data: drivers, loading: loadingDrivers, error: errorDrivers } = useQuery('/drivers', 'drivers')

  if (loadingDrivers || loadingTeams) return <p>Loading...</p>
  if (errorDrivers || errorTeams) return <p>Error: {errorDrivers || errorTeams}</p>
  if (!drivers || drivers.length === 0) return <p>No drivers found.</p>
  if (!teams || teams.length === 0) return <p>No teams found.</p>

  return (
    <>
      <h2 className="teams-header">Teams</h2>
      <ul className="teams-list">
        {/* Render a TeamList card for each team */}
        {teams.map((team) => (
          <TeamList key={team.id} team={team} drivers={drivers} />
        ))}
      </ul>
    </>
  )
}
