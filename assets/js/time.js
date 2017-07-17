import moment from 'moment'
import Vue from 'vue'

Vue.filter('datetime', v => moment(v).format('lll'))
