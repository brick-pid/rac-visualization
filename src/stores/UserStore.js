// write a userStorage file to store the user data, using mobx
import { makeAutoObservable } from 'mobx'

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  // Observable state
  user = {
    account: 'brick',
    password: 'brick',
  }

  // Actions
  setUser = (user) => {
    this.user = user
  }
}
const userStore = new UserStore()
export default userStore