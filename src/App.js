import {useEffect} from 'react'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import CartContainer from './components/CartContainer'
import {calculateTotals, getCartItems} from './features/cart/cartSlice'
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const {cartItems, isLoading} = useSelector((store) => store.cart)
  const {isOpen} = useSelector((store) => store.modal)
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(calculateTotals())
  }, [dispatch, cartItems]
  )

  useEffect(() => {
    dispatch(getCartItems('pass-name-here'));
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer/>
  </main>;
}
export default App;
