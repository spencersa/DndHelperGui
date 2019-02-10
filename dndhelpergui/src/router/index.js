import Vue from 'vue'
import Router from 'vue-router'
import RollableTables from '@/components/RollableTables'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableRollableTablesData',
      component: RollableTables
    }
  ]
})
