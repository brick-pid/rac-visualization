import { makeAutoObservable } from 'mobx'
import axios from 'axios'
class RankListStore {
  constructor() {
    makeAutoObservable(this)
  }
  rankList = []
  setRankList = (ranklist) => {
    this.ranklist = ranklist
  }
  getTraceRCARankList = async () => {
    // fetch data from server
    try {
      const response = await axios.get('http://localhost:5000/ranklist/tracerca')
      console.log("get traceRCA ranklist from server", response.data)
      return response.data
    } catch (error) {
      console.error('fetch tracerca ranklist error', error)
    }
  }
  getRandomWalkRankList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ranklist/randomwalk')
      console.log("get randomWalk ranklist from server", response.data)
      this.setApplication(response.data)
    } catch (error) {

    }
  }
}

const rankListStore = new RankListStore()
export default rankListStore
