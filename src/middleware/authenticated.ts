import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = async ({ redirect, app: { $firebase } }) => {
  await new Promise((resolve) => {
    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        redirect('/guest/login')
      } else {
        resolve(user)
      }
    })
  })
}

export default myMiddleware
