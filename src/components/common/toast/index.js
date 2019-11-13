import Vue from 'vue'
import vueToastMessage from './Toast.vue'
let ToastTem = Vue.extend(vueToastMessage)
let instance
let timer = null
let toastMessage = (options) => {
  if (!instance) {
    instance = new ToastTem()
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
  }
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
  let time = options.time
  if (typeof options === 'string') {
    instance.message = options
  } else if (typeof options === 'object') {
    let { message, time } = options
    instance.message = message
    time = time || 3000
  } else {
    return
  }
  instance.show = true

  time = time || 3000

  timer = setTimeout(() => {
    instance.show = false
    clearTimeout(timer)
    timer = null
    instance.message = ''
  }, time)
}
toastMessage.close = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
}
toastMessage.install = (Vue) => {
  Vue.prototype.$toastMessage = toastMessage
}

export default toastMessage