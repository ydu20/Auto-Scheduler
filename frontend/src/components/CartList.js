import CartListItem from './cartListItem'


const CartList = ({cart, setCart}) => {

    return (
        <div>
            {cart.map((course, index) => (
                <CartListItem course = {course} cart = {cart} setCart = {setCart}/>
            ))}
        </div>
    )
}

export default CartList