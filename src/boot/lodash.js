import _ from 'lodash'

export default ({ Vue }) => {
  window._ = _
  Vue.prototype.$_ = _ // then use as this.$_
}
