/**
 * home module router
 */

import { RouteConfig } from 'vue-router'

function getView(viewName) {
    return (resolve, reject) => {
        require.ensure(
            [],
            require => {
                let map = {
                    home: require('views/Home'),
                    defaultView: require('views/Home'),
                }

                resolve(map[viewName])
            },
            reject,
            'home'
        )
    }
}

let routes: RouteConfig[] = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'defaultView',
        path: '*'
    },
    {
        name: 'doc',
        path: '/doc'
    }
]

routes.forEach(v => {
    // 支持一层路由镶嵌
    if (!v.redirect && !v.component) {
        if (v.children) {
            v.children.forEach((cv) => {
                cv.component = getView(cv.name)
            })
        }
        v.component = getView(v.name)
    }
})

export default routes
