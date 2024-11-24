import { dateFormatter } from "@/db.supa.backend/utils";

const DetailAdminInvoice = ({ selectedInvoice, setViewDetail }) => {

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
    return (
        <div className="min-h-max">
            <h1 className="text-2xl font-bold mb-4">
                Invoice / <span className="font-medium text-orange-600">{selectedInvoice.id}</span>
            </h1>

            <button
                className='bg-orange-200 p-2 rounded-md text-sm my-5 hover:bg-orange-300 transition duration-200'
                onClick={() => setViewDetail(false)}
            >
                Back
            </button>

            <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedInvoice.users.name}</p>
                    <p><strong>Contact:</strong> {selectedInvoice.users.contact_no}</p>
                    <p><strong>Email:</strong> {selectedInvoice.users.email}</p>
                    <p><strong>Sex:</strong> {selectedInvoice.users.sex}</p>
                    <p><strong>Address:</strong> {selectedInvoice.users.address}</p>
                </div>

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
                            <p><strong>Product:</strong> {item.products.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> ${item.products.price.toFixed(2)}</p>
                            <p><strong>Total Price:</strong> ${item.total_price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DetailAdminInvoice;