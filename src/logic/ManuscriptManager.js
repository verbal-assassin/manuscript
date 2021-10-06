import Base from './Base'

/**
 * contains all the logic of data validation, saving, and retrieving
 * of the data from the data storage.
 */
export default class ManuscriptManager extends Base {
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
   * @method Get()    retrieve the manuscript specified by the manuscriptId passed in.
   * 
   * @param {identifier}  manuscriptId  a unique id that identifies the manuscript
   */
  GetAll = async() => {
  }
  /**
   * @method Get()    retrieve the manuscript specified by the manuscriptId passed in.
   * 
   * @param {identifier}  manuscriptId  a unique id that identifies the manuscript
   */
  Get = async(manuscriptId) => {

    const url = `${this.#configuration.manuscriptEndpoint}/${manuscriptId}`
    let response = await fetch(url)
    let manuscript = await response.json()

    return manuscript
  }

  GetChapter = async(chapterId) => {
    const url = `${this.#configuration.manuscriptEndpoint}/chapter/${chapterId}`
    let response = await fetch(url)
    let chapter = await response.json()
    
    return chapter[0].chapterText
  }
}
