const mutations = {
  addCart(state, payload) {
    console.log(payload)
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === payload.iid)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
  }
}

export default mutations