import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { host } from './config'
import getToken from './csrfToken'
import { Notify } from 'quasar-framework/dist/quasar.mat.esm'

const httpLink = new HttpLink({
    // Take care : if you change the api endpoint in config/packages/api_platform.yaml you need to change it here
    // You should use an absolute URL here
    uri: `//${host}/api/graphql`,
    credentials: 'same-origin',
})

onError(({ networkError }) => {
    if ([500, 423, 403, 401].find(code => code === networkError.statusCode)) {
        logout()
    }
})

/**
 * @todo test this feature : not sure that GraphQL routes is secured by Symfony Security
 * When the final release of api-platform 2.2 exists, test again with implementation of security
 *
 * @type {ApolloLink}
 */
onError(({ networkError }) => {
    if (423 === networkError.statusCode) {
        getToken()
            .then(res => Toast.create.warning(`Invalid token, please try again`))
            .catch(err => console.warn('apollo onError', 'getToken', err))
    } else {
        console.warn(`Unknown error ${networkError.statusCode}`, networkError)
        Notify.create({
            message: `Unknown error ${networkError.statusCode}`,
            type: 'warning'
        })
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
