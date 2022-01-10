import CartListItem from './cartListItem'


const CartList = ({cart, setCart}) => {

    return (
        <div>
            {cart.map((course, index) => (
                <CartListItem course = {course} />
            ))}
        </div>
    )
    
}

export default CartList