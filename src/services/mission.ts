/**
 * Represents information about a space mission.
 */
export interface Mission {
  /**
   * The name of the mission.
   */
  name: string;
    /**
   * The name of the mission.
   */
  owner: string;
    /**
   * The name of the mission.
   */
  wavelength: string;
    /**
   * The name of the mission.
   */
  target: string;
    /**
   * The name of the mission.
   */
  goals: string;
     /**
   * The name of the mission.
   */
  type: string;
     /**
   * The name of the mission.
   */
  launchYear: number;
     /**
   * The name of the mission.
   */
  country: string;
}

/**
 * Asynchronously retrieves information about a specific mission.
 * @param missionName The name of the mission to retrieve information for.
 * @returns A promise that resolves to a Mission object.
 */
export async function getMission(missionName: string): Promise<Mission> {
  // TODO: Implement this by calling an API.

  return {
    name: missionName,
    owner: 'NASA',
    wavelength: 'X-Ray',
    target: 'Mars',
    goals: 'Explore the surface',
    type: 'Active',
    launchYear: 2020,
    country: 'USA',
  };
}
