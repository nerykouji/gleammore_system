import { useCartBackend, useCartShippingFeeBackend, useCartUpdateItemBackend, useCheckoutBackend } from "@/db.supa.backend/cart.backend";
import { useState } from "react";


const CartComp = () => {
    const { cart, loading: loadingCart, refreshCart } = useCartBackend();
    const { fee, loading, error } = useCartShippingFeeBackend();
    const { loading: loadingCheckout, error: errorCheckouut, checkout } = useCheckoutBackend();
    const [method, setMethod] = useState({
        method: ""
    });

    const handleRefresh = async () => {
        await refreshCart();
    }

    const handleMethod = (e) => {
        const { name, value } = e.target;
        setMethod({ ...method, [name]: value });
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.products.price * item.quantity);
    }, 0) + (fee || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;
        const res = await checkout(method.method)

        if (res !== null || res !== undefined) {
            handleRefresh();
        }
    }



    return (

        <section
            className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                    <div
                        className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                            <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cart.length} Items</h2>
                        </div>
                        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                            <div className="col-span-12 md:col-span-7">
                                <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            cart.map(item => <CartItem key={item.id} item={item} handleRefresh={handleRefresh} />)
                        }

                    </div>
                    <div
                        className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary</h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">{cart.length} Items</p>
                                <p className="font-medium text-lg leading-8 text-black">₱{totalPrice.toFixed(2)}</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">Shipping Fee
                                </label>
                                <div className="flex pb-6">
                                    <div className="relative w-full">

                                        <div className="block h-auto pr-10 pl-2 py-2.5 text-2xl font-medium shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400">
                                            ₱{parseFloat(fee || 0).toFixed(2)}
                                        </div>

                                    </div>

                                </div>
                                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Payment Method
                                </label>
                                <div className="flex pb-4 w-full">
                                    <div className="relative w-full ">

                                        <select name="method" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={method.method} onChange={handleMethod} required>
                                            <option value="" >Payment Method</option>
                                            <option value="cod" >Cash on Delivery</option>
                                            <option value="gcash">G-Cash</option>
                                            <option value="cash">Cash</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="font-medium text-xl leading-8 text-black">{cart.length} Items</p>
                                    <p className="font-semibold text-xl leading-8 text-indigo-600">₱{totalPrice.toFixed(2)}</p>
                                </div>
                                <button
                                    className={`w-full text-center ${cart.length === 0 || loadingCheckout ? "bg-slate-300" : "bg-indigo-600 hover:bg-indigo-700"}  rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500`} disabled={cart.length === 0 || loadingCheckout}>{loadingCheckout ? "Checking out..." : "Checkout"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}


const CartItem = ({ item, handleRefresh }) => {
    const [qty, setQty] = useState(item.quantity);
    const { loading: loadingQtyUpdate, updateItemCart } = useCartUpdateItemBackend();

    const handleIncreaseQty = () => {
        setQty(prevQty => prevQty + 1);
    };

    const handleDecreaseQty = () => {
        setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
    };

    const totalPrice = item.products.price * item.quantity;

    const handleUpdateQty = async (qtyy) => {
        if (qtyy > 0) {
            await updateItemCart(item.id, qtyy)
            handleRefresh();
        }

    }

    return (
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
            <div className="w-full md:max-w-[126px]">
                <img
                    src={item.products.product_images[0].url || "https://pagedone.io/asset/uploads/1701162850.png"} // Use item image or a default
                    alt={item.name}
                    className="mx-auto rounded-xl object-cover"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{item.products.name}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{item.products.category}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                            ₱{item.products.price}
                        </h6>
                    </div>
                </div>
                <QuantityControl qty={qty} onIncrease={handleIncreaseQty} onDecrease={handleDecreaseQty} loadingQtyUpdate={loadingQtyUpdate} handleUpdateQty={handleUpdateQty} />
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        ₱{totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

const QuantityControl = ({ qty, onIncrease, onDecrease, loadingQtyUpdate, handleUpdateQty }) => {
    return (
        <div className="flex items-center h-full max-[500px]:justify-center">
            <button
                className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 hover:border-gray-300"
                onClick={() => {
                    onDecrease();
                    handleUpdateQty(qty - 1)
                }}
                disabled={loadingQtyUpdate}
            >
                {/* SVG for Decrease */}
                <svg className={`${loadingQtyUpdate ? "animate-spin" : ""} stroke-gray-900 transition-all duration-500 group-hover:stroke-black`} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M16.5 11H5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>
            <input
                type="text"
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                value={qty}
                readOnly
            />
            <button
                className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 hover:border-gray-300"
                onClick={() => {
                    onIncrease();
                    handleUpdateQty(qty + 1)
                }}
                disabled={loadingQtyUpdate}
            >
                {/* SVG for Increase */}
                <svg className={`${loadingQtyUpdate ? "animate-spin" : ""} stroke-gray-900 transition-all duration-500 group-hover:stroke-black`} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
};


export default CartComp;