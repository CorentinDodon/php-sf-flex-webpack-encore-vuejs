import router from './form/router/index'
import { Toast } from 'quasar-framework'

export default function isLoggedIn(loaderToActivate)
{
    return new Promise((resolve, reject) => {
        if (loaderToActivate && loaderToActivate.isLoading) {
          loaderToActivate.isLoading = true
        }

        const uri = '/demo/login/isloggedin'
        const myHeaders = new Headers()
        myHeaders.append("Accept", "application/json")
        myHeaders.append("Content-Type", "application/json")
        const myInit = {
          method: 'GET',
          headers: myHeaders,
          credentials: 'same-origin',
          mode: 'cors',
          cache: 'no-cache',
        }
        fetch(uri, myInit)
            .then(res => {
                if ([500, 403, 401, ].find(code => code === res.status)) {
                  logout()
                  reject()

                  return
                }

                res.json()
            })
            .then(res => {
                if (loaderToActivate && loaderToActivate.isLoading) {
                  loaderToActivate.isLoading = false
                }

                resolve(true)
            })
    })
}

export const resetLoginInfo = function() {
  localStorage.removeItem('isLoggedIn')
}

export const logout = function() {
  resetLoginInfo()
  Toast.create.info('You have been logged out.')
  router.go('/')
}
