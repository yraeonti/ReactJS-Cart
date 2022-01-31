import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {loading: false, cart: cartItems, amount: 0, total: 0})

  const clearCart = () => {
    dispatch({type: "CLEAR_CART"})
  }

  const remove = (id) => {
    dispatch({type: "REMOVE", payload: id})
  }

  const increase = (id) => {
    dispatch({type: "INCREASE", payload: id})
  }

  const decrease = (id) => {
    dispatch({type: "DECREASE", payload: id})
  }
  
  useEffect(() => {
    dispatch({type: "TOTAL"})
  
  },[state.cart])
  
  const loader = async () => {
      dispatch({type: "LOADING"})
      const response = await fetch(url)
      const data = await response.json()
      dispatch({type: "OFFLOAD", payload :data})
    }
    
useEffect(() => {
   loader()
},[])




  



  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
