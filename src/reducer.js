const reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        return {...state, cart: []}
    }
    if (action.type === "REMOVE") {
        const newcart = state.cart.filter((cartitem) => cartitem.id !== action.payload)
        return {...state, cart: newcart}
    }
    if (action.type === "INCREASE") {
        const item = state.cart.map((ite) => {
            if (ite.id === action.payload) {
              const newamount = ite.amount + 1
               return {...ite, amount: newamount }
            }
            return ite
        }) 
        return {...state, cart:item }
    }
    if (action.type === "DECREASE") {
        const item = state.cart.map((ite) => {
            if (ite.id === action.payload) {
              const newamount = ite.amount - 1
               return {...ite, amount: newamount }
            }
            return ite
        })
        const item2 = item.filter((leave) => leave.amount !== 0)
        return {...state, cart:item2 }
    }
    if (action.type === "TOTAL") {
       const data = state.cart.reduce((carttotal, cartitem) => {
         const totalprice = cartitem.amount * cartitem.price
         carttotal.total = carttotal.total + totalprice
         carttotal.amount += cartitem.amount
    
       return carttotal
     },{amount:0, total:0})
         const revtotal = parseFloat(data.total.toFixed(2))
        return{...state, amount: data.amount, total:revtotal}
    }

    if (action.type === "LOADING") {
        return{...state, loading: true}
    }
    if (action.type === "OFFLOAD") {
        return {...state, cart: action.payload, loading:false}
    }
    throw new Error('i dont')
}

export default reducer;