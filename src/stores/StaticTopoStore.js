import { makeAutoObservable } from 'mobx'
import axios from 'axios'
class StaticTopoStore {
  constructor() {
    makeAutoObservable(this)
  }
  application = []
  setApplication = (application) => {
    this.application = application
  }
  getServiceOfApplication = async (application) => {
    // fetch data from server
    try {
      const response = await axios.get('http://localhost:5000/application/' + application.id)
      console.log("services of application", response.data)
      return response.data
    } catch (error) {
      console.error('fetch service of application error', error)
    }
  }
  getApplication = async () => {
    try {
      const response = await axios.get('http://localhost:5000/application/all')
      console.log("applications", response.data)
      this.setApplication(response.data)
    } catch (error) {

    }
  }
}

const staticTopoStore = new StaticTopoStore()
export default staticTopoStore
