import DriverList from './DriverList.jsx'
import useQuery from '../../api/useQuery.js'

/**
 * DriversPage fetches and displays a list of all drivers.
 * Uses DriverList to render each driver card.
 */
export default function DriversPage() {
  // Fetch all drivers
  const { data: drivers, loading: driversLoading, error: driversError } = useQuery('/drivers', 'drivers')
  const { data: teams, loading: teamsLoading, error: teamsError } = useQuery('/teams', 'teams')

  if (teamsLoading || !teams || driversLoading || !drivers) return <p>Loading...</p>
  if (teamsError || driversError) return <p>Error! {teamsError || driversError}</p>

  return (
    <>
      <h2 className="drivers-header">Drivers</h2>
      <ul className="driver-list">
        {/* Render a DriverList card for each driver */}
        {drivers.map((driver) => (
          <DriverList key={driver.driver_number} driver={driver} teams={teams} />
        ))}
      </ul>
    </>
  )
}
