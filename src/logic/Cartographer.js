import Base from './Base'

export default class Cartographer extends Base {
  #configuration
  #countryList

  constructor(configuration) {
    super()

    if (configuration === undefined || configuration === null) {
      console.log('bad configuration')
    }
    this.#configuration = configuration
    this.#countryList = []
  }
  /**
   * @method GetCountries()   retrieve list of countries
   */
  GetCountries = async() => {

    if( this.#countryList.length === undefined || this.#countryList.length === 0 ) {

      let start = new Date()
      let countries = await this.GetIt(this.#configuration.countryEndpoint)
      let end = new Date()
      console.log(`retrieving ${end-start}`)

      this.#countryList = countries.map( country => {
        return ({
          "key": country.alpha3Code,
          "value": country.alpha3Code,
          "text": country.name
        })
      })
    } else {
      console.log('not retrieving')
    }

    return this.#countryList
  }
  /**
   * This method will attempt to return the full name of the country based 
   * on the ISO 3 character code passed into this method.
   * 
   * @param {string} code ISO 3166 internationally recognized code for the country
   */
  GetCountryNameByCode = async(code) => {

    let url = `${this.#configuration.countryByCodeEndpoint}${code}&fields=name`
    let fullName = await this.GetIt(url)
    //
    //  data cleansing...
    //
    if(fullName === undefined || fullName === null || fullName.length === 0) {
      fullName = 'Not Found'
    }
    
    return fullName[0].name
  }
}
