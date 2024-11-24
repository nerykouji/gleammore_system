'use client'
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import { useCurrentUserInvoiceBackend, useShipUpdateStatusBackend } from "@/db.supa.backend/invoice.backend";
import { dateFormatter, getCurrentUser, signout, useCurrentUser } from "@/db.supa.backend/utils";
import { useEffect, useState } from "react";


const Profile = () => {
    const { invoice, refreshInvoice } = useCurrentUserInvoiceBackend()
    const [user, setUser] = useState({})
    const [view, setView] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState([])
    const { loading: loadingUpdateStatus, shipCancelClient } = useShipUpdateStatusBackend();

    useCurrentUser();

    useEffect(() => {
        const u = getCurrentUser();
        setUser(u)

    }, [setUser])

    const handleCancelOrder = async (shipId) => {
        await shipCancelClient(shipId);
        setView(false)
        refreshInvoice();
    }


    const statusColor = (status) => {
        switch (status) {
            case 'pending':
                return <span className="text-amber-500 font-medium">Pending</span>
            case 'cancel':
                return <span className="text-rose-500 font-medium">Cancelled</span>
            case 'delivered':
                return <span className="text-green-500 font-medium">Delivered</span>
            default:
                return <span className="text-blue-500 font-medium">{status}</span>
        }
    }





    const detailTransaction = (setView, selectedInvoice, handleCancelOrder, loadingUpdateStatus) => {
        return (
            <div className="p-10 m-10 bg-slate-50">
                <h1 className="text-2xl font-bold mb-4">
                    Invoice / <span className="font-medium text-orange-600">{selectedInvoice.id}</span>
                </h1>

                <button
                    className='bg-orange-200 p-2 rounded-md text-sm my-5 hover:bg-orange-300 transition duration-200'
                    onClick={() => setView(false)}
                >
                    Back
                </button>

                <div className="bg-white rounded-md shadow-md p-6">
                    <hr className="my-4" />

                    <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                    <div className="space-y-2">
                        <p><strong>Shipped Date:</strong> {selectedInvoice.shipping[0].date_shipped && dateFormatter(selectedInvoice.shipping[0].date_shipped) || "not set"}</p>
                        <p><strong>Delivered Date:</strong> {selectedInvoice.shipping[0].date_delivered && dateFormatter(selectedInvoice.shipping[0].date_delivered) || 'not set'}</p>
                        <p><strong>Status:</strong> {statusColor(selectedInvoice.shipping[0].status)}</p>
                        <p><strong>Shipping Fee:</strong> ${selectedInvoice.shipping[0].shipping_fee.toFixed(2)}</p>
                    </div>

                    <hr className="my-4" />

                    <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                    <div className="space-y-2">
                        <p><strong>Payable:</strong> ${selectedInvoice.payment[0].payable.toFixed(2)}</p>
                        <p><strong>Mode:</strong> {selectedInvoice.payment[0].mode}</p>
                    </div>

                    <hr className="my-4" />

                    <h2 className="text-lg font-semibold mb-4">Orders</h2>
                    <ul className="space-y-3">
                        {selectedInvoice.orders.map((item) => (
                            <li key={item.id} className="border p-3 rounded-md shadow-sm bg-gray-100">
                                <img src={item.products.product_images[0].url} className="w-[150px] h-auto" />
                                <p><strong>Product:</strong> {item.products.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> ${item.products.price.toFixed(2)}</p>
                                <p><strong>Total Price:</strong> ${item.total_price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>


                    {selectedInvoice.shipping[0].status === 'cancel' || selectedInvoice.shipping[0].status === 'delivered' ?
                        ""
                        : <button className="bg-red-500 text-white my-5 font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={() => handleCancelOrder(selectedInvoice.shipping[0].id)}
                            disabled={loadingUpdateStatus}
                        >
                            Cancel Order
                        </button>
                    }

                </div>

            </div>
        );
    }

    const profileView = (setView, setSelectedInvoice) => {
        return (
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

                <div className="w-full md:w-2/3 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-600 font-medium">Username:</label>
                            <p className="text-lg text-gray-800">{user.username || "johndoe"}</p>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Name:</label>
                            <p className="text-lg text-gray-800">{user.name || "John Doe"}</p>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Email:</label>
                            <p className="text-lg text-gray-800">{user.email || "johndoe@example.com"}</p>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Address:</label>
                            <p className="text-lg text-gray-800">{user.address || "123 Main St, Springfield, IL"}</p>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Contact:</label>
                            <p className="text-lg text-gray-800">{user.contact_no || "(123) 456-7890"}</p>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Sex:</label>
                            <p className="text-lg text-gray-800">{user.sex || "Male"}</p>
                        </div>
                        <button
                            className="w-full text-center bg-indigo-600 hover:bg-indigo-700  rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500" onClick={signout}>Logout</button>
                    </div>
                </div>


                <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-teal-500 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
                    <ul className="space-y-4">
                        {invoice.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                                onClick={() => {
                                    setSelectedInvoice(item);
                                    setView(true);
                                }}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">{item.id}</span>
                                    <span className="text-sm text-gray-600">Status: <span className="font-medium">{statusColor(item.shipping[0].status)}</span></span>
                                    <span className="text-sm text-gray-500">Date Shipped: <span className="font-medium">{item.shipping[0].date_shipped && dateFormatter(item.shipping[0].date_shipped) || "not set"}</span></span>
                                    <span className="text-sm text-gray-500 mt-2">{dateFormatter(item.date)}</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900">${item.total_price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                </div>


            </div>

        )
    }




    return (
        <div className="h-screen flex flex-col">
            <Header />

            <main aria-label="Container content" className="flex-grow p-2">

                {view ? detailTransaction(setView, selectedInvoice, handleCancelOrder, loadingUpdateStatus) : profileView(setView, setSelectedInvoice)}

            </main>

            <Footer />
        </div>
    )
}


export default Profile;