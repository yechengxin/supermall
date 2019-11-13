import { ADD_TO_CART, ADD_COUNTER, CUT_COUNTER} from './mutation-types'
export default {
    //mutations唯一的目的就是修改state的状态
    //mutations中的每个方法尽可能完成的事件比较单一
    // 数量+1
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [CUT_COUNTER](state, payload) {
        payload.count--
    },
    //添加数据
    [ADD_TO_CART](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    },
    
}