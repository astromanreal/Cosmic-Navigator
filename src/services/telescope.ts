/**
 * Represents information about a telescope.
 */
export interface Telescope {
  /**
   * The name of the telescope.
   */
  name: string;
  /**
   * The type of telescope (e.g., space-based, ground-based).
   */
  type: string;
  /**
   * Key technologies used in the telescope.
   */
  keyTechnologies: string;
  /**
   * A summary of the data captured by the telescope.
   */
  dataCaptured: string;
  /**
   * Information about future upgrades to the telescope.
   */
  futureUpgrades: string;
}

/**
 * Asynchronously retrieves information about a specific telescope.
 * @param telescopeName The name of the telescope to retrieve information for.
 * @returns A promise that resolves to a Telescope object.
 */
export async function getTelescope(telescopeName: string): Promise<Telescope> {
  // TODO: Implement this by calling an API.

  return {
    name: telescopeName,
    type: 'Space-based',
    keyTechnologies: 'Infrared sensors',
    dataCaptured: 'Images of distant galaxies',
    futureUpgrades: 'Improved resolution',
  };
}
