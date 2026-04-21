import useQuery from '../../api/useQuery.js'
import useMutation from '../../api/useMutation.js'
import DriverList from '../drivers/DriverList.jsx'
import TeamList from '../teams/TeamList.jsx'
import AddFavoriteDriverSection from './AddFavoriteDriverSection.jsx'
import AddFavoriteTeamSection from './AddFavoriteTeamSection.jsx'
import { useTheme } from '../ThemeContext.jsx'

/**
 * ProfilePage displays the user's profile, including favorite driver and team.
 * Allows adding or removing favorites using mutation hooks.
 */
export default function ProfilePage() {
  // Fetch user profile with favorite driver and team
  const { data: user, loading: userLoading, error: userError } = useQuery('/users/profile', 'profile')
  const { data: drivers, loading: driversLoading, error: driversError } = useQuery('/drivers', 'drivers')
  const { data: teams, loading: teamsLoading, error: teamsError } = useQuery('/teams', 'teams')
  const { oppositeTheme } = useTheme()

  const userFavoriteDriver = user?.userFavoriteDriver
  const userFavoriteTeam = user?.userFavoriteTeam

  // API call to remove favorite team and driver.
  // It doesn't need any JSON body data
  // since user ID and team ID are obtained from middleware on the backend.
  // Therefore, when calling mutate for these APIs,
  // we don't need to pass anything in as an argument.
  const { mutate: removeTeam } = useMutation('DELETE', `/teams/${userFavoriteTeam?.id}`, ['profile'])
  const { mutate: removeDriver } = useMutation('DELETE', `/drivers/${userFavoriteDriver?.driver_number}`, ['profile'])

  if (!user) return <p>No user data</p>
  if (userLoading || driversLoading || teamsLoading) return <p>Loading...</p>
  if (userError) return <p>Error! {userError}</p>
  if (driversError) return <p>Error! {driversError}</p>
  if (teamsError) return <p>Error! {teamsError}</p>

  return (
    <div className="profile-main">
      <div className="profile-header">
        <h2 className="welcome-message">
          Welcome, {user?.user.first_name} {user?.user.last_name}!
        </h2>
        <p>Use the sections below to manage your favorite driver and team.</p>
      </div>

      <div className="favorites">
        {/* ----- Favorite Driver ----- */}
        <section className="favorite-driver">
          <h3>Favorite Driver</h3>
          {userFavoriteDriver === undefined ? (
            <AddFavoriteDriverSection drivers={drivers} />
          ) : (
            <>
              {/* Show favorite driver and remove button */}
              <DriverList driver={userFavoriteDriver} teams={teams} />
              <br />
              <button className={`btn btn-outline-${oppositeTheme} btn-sm`} onClick={() => removeDriver()}>
                Remove Favorite Driver
              </button>
            </>
          )}
        </section>

        {/* ----- Favorite Team ----- */}
        <section className="favorite-team">
          <h3>Favorite Team</h3>
          {userFavoriteTeam === undefined ? (
            <AddFavoriteTeamSection teams={teams} />
          ) : (
            <>
              {/* Show favorite team and remove button */}
              <TeamList team={userFavoriteTeam} drivers={drivers} />
              <br />
              <button className={`btn btn-outline-${oppositeTheme} btn-sm`} onClick={() => removeTeam()}>
                Remove Favorite Team
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
