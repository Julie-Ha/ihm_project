import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Table from '../components/Table.vue'
import Map from '../components/Map.vue'
import Graph from '../components/Graph.vue'
import TableFiltre from '../components/TableFiltre.vue'

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
 {
    path: '/TableFiltre',
    name: 'TableFiltre',
    component: TableFiltre
  },
]

const router = new VueRouter({
   mode:"history",
  routes
})

export default router
