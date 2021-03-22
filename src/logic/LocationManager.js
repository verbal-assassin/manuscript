import Base from './Base'

export default class LocationManager extends Base {
  #configuration
  /**
   * @constructor constructor for Location Manager.
   * 
   * @param {object} configuration configuration data defining endpoints and such.
   */
  constructor(configuration) {
    super()

    if (configuration === undefined || configuration === null) {
      console.log('bad configuration')
    }
    this.#configuration = configuration
  }
  /**
   * @method Save()   validate the object, and then save it.
   * 
   * @param {identifier}  manuscriptId  a unique id that identifies the manuscript
   * @param {object}      location      object containing location data that will be saved.
   */
  Save = async(manuscriptId, location) => {
    //
    //  build up the final url now that we have a manuscript id and a location id
    //
    const url = `${this.#configuration.locationEndpoint}/${manuscriptId}/${location._id}`

    if( !this.ValidateData(location)) {
      console.log('data is not valid')
      return
    }
    return this.SaveIt(url, location)
  }
  /**
   * @method Update()     the sort order of locations for a given manuscript.
   * 
   * @param {object id}   manuscriptId  key to the data for a given manuscript
   * @param {object}      locations     location to update the sort order for.
   */
  UpdateSortOrder = async(manuscriptId, locations) => {

    locations.forEach(async (location, index) => {

      console.log(`location ${location.name} old sort order ${location.sortOrder}, new order ${index}`)
      location.sortOrder = index
      await this.Save(manuscriptId, location)
    })
  }
  /**
   * @method ValidateData() validate the location data to make sure it's valid before we
   *                        save it to the data storage utility.
   * 
   * @param {object}        location    contains the location information we are saving
   */
  ValidateData = (location) => {

    if (location === null || location === undefined) return false
    if (location.name === null || location.name === undefined || location.name === '') return false

    return true
  }
}
