import { ADD_TO_CART, ADD_COUNTER, CUT_COUNTER} from './mutation-types'
export default {
    addCart(context, payload) {
        //使用promise让外界知道addcart操作成功
        return new Promise((resolve, reject) => {
            // 1.查看该商品是否已经添加到cartList中
            const oldProdect = context.state.cartList.find(item => item.iid === payload.iid)
            // 2.如果oldInfo存在, 那么原来的数量加1
            if (oldProdect) {
                // oldProdect.count += 1
                context.commit(ADD_COUNTER, oldProdect)
                resolve('购物车中该商品数量+1')
            } else {
                payload.count = 1
                //state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('该商品已添加进购物车')
            }
        })
    },
    addCount(context,iid) {
        const oldProdect = context.state.cartList.find(item => item.iid === iid)
        // oldProdect.count ++
        context.commit(ADD_COUNTER, oldProdect)
    },
    cutCount(context,iid) {
        const oldProdect = context.state.cartList.find(item => item.iid === iid)
        // oldProdect.count --
        context.commit(CUT_COUNTER, oldProdect)
    },
    delGoods(context,iid) {
        const index = (ontext.state.cartList || []).findIndex((item) => item.iid === iid);
    }
}