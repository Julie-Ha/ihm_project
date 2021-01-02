import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Table from '../components/Table.vue'
import Map from '../components/Map.vue'
import Graph from '../components/Graph.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  },
]

const router = new VueRouter({
  routes
})

export default router
