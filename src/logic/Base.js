export default class Base {
#dumb
  constructor() {
    this.#dumb = 'dumb'
  }

  GetIt = async(url) => {

    let response = await fetch(url)
    let data = await response.json()
    return data
  }
  /**
   * @method Save() a generic save method that takes the onus away from the various 
   *        objects that will inherit this class.
   * 
   * @param {string} url  contains full URL of the REST endpoint that will handle
   *                      the saving of the object
   * 
   * @param {object} objectToSave the object that will be saved
   */
  SaveIt = async(url, objectToSave) => {
    console.log(objectToSave)
    var response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectToSave)
    })
    console.log(response)
    return response
  }

}

