import { useShipUpdateStatusBackend } from '@/db.supa.backend/invoice.backend';

const InvoiceShipStatusModalAdmin = ({ isOpen, onClose, selectedInvoice, handleRefresh, shipStatusUpdate, loading, shippingStatus, setShippingStatus }) => {
    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        await shipStatusUpdate(selectedInvoice.shipping[0].id, shippingStatus);
        onClose();
        handleRefresh();       
    };

    const selectOptionsStatus = () => {
        const status = selectedInvoice.shipping[0].status;
        switch (status) {
            case 'pending':
                return (<>
                    <option value="pending" disabled>Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="cancel">Cancelled</option>
                </>)
            case 'shipped':
                return (<>
                    <option value="shipped" disabled >Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancel">Cancelled</option>
                </>)
            case 'delivered':
                return (<>
                    <option value="delivered" disabled >Delivered</option>
                    <option value="returned">Returned</option>
                </>)
            case 'cancel':
                return (<>
                    <option value="">Cannot be changed</option>
                </>)
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm w-full">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Update Shipping Status</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="shipping-status" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Shipping Status
                    </label>
                    <select
                        id="shipping-status"
                        name="shipping-status"
                        value={shippingStatus}
                        onChange={(e) => setShippingStatus(e.target.value)}
                        required
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        {/* <option value="" disabled>Select a status</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">Cancelled</option> */}
                        {
                            selectOptionsStatus()
                        }
                    </select>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                            disabled={loading}>
                            {loading ? 'Loading...' : 'Update Status'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceShipStatusModalAdmin;