/**
 * Represents information about a rocket.
 */
export interface Rocket {
  /**
   * The name of the rocket.
   */
  name: string;
  /**
   * The country of origin of the rocket.
   */
  country: string;
  /**
   * The type or configuration of the rocket.
   */
  type: string;
  /**
   * A brief history of the rocket's launches.
   */
  launchHistory: string;
  /**
   * Notable missions the rocket has been involved in.
   */
  notableMissions: string;
}

/**
 * Asynchronously retrieves information about a specific rocket.
 * @param rocketName The name of the rocket to retrieve information for.
 * @returns A promise that resolves to a Rocket object.
 */
export async function getRocket(rocketName: string): Promise<Rocket> {
  // TODO: Implement this by calling an API.

  return {
    name: rocketName,
    country: 'USA',
    type: 'Saturn V',
    launchHistory: 'Successful lunar missions',
    notableMissions: 'Apollo missions',
  };
}
