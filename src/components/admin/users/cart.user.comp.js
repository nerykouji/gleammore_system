


const CartAdminUserComp = ({ setViewCart, selectedUser }) => {
    console.log(selectedUser);

    return (
        <div className='bg-gray-50 shadow-md rounded w-full min-h-max p-10'>

            <h1 className="text-lg font-medium"><span className="underline">{selectedUser.name}</span>/Cart</h1>

            <button className='bg-orange-200 p-2 rounded-sm text-sm my-5' onClick={() => {
                setViewCart(false);
            }} > Back </button>

            <table className="table-auto w-full text-sm text-left text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th>
                            Images
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUser.cart.map((item, index) => {
                        return (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-1 py-1 font-medium text-gray-900">
                                    <img src={item.products.product_images[0].url} className="w-[150px] h-auto" />
                                </th>
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900">
                                    {item.products.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {item.products.price}
                                </td>
                                <td className="px-6 py-4">
                                    {(item.products.price * item.quantity).toFixed(2)}
                                </td>



                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default CartAdminUserComp;