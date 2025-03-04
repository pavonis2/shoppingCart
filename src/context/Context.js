import { createContext, useContext, useReducer } from 'react'
import { 
  randUuid,
  randProductName,
  randNumber,
  randImg, 
  rand,
  randBoolean,
  seed
} from '@ngneat/falso';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();
seed(99);

const Context = ({children}) => {

  const products = [...Array(20)].map(() => ({
    id: randUuid(),
    name: randProductName(),
    price: randNumber({ min: 100, max: 10000 }),
    image: randImg(),
    inStock: rand([0, 3, 5, 6, 7]),
    fastDelivery: randBoolean(),
    ratings: rand([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: []
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  // console.log(productState);

  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
      {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(Cart);
};