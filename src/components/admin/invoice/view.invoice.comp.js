import { dateFormatter, statusColor } from "@/db.supa.backend/utils";


const ViewAdminInvoiceComp = ({ invoice, setSelectedInvoice, setViewDetail, openModal, setShippingStatus }) => {
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
        <div className="mt-10">

            <table className="table-auto w-full text-sm text-left text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Invoice Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payable
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delivery Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Shipped Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoice.map((item, index) => {
                            return (
                                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.users.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.total_price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.users.address}
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer hover:bg-slate-200" onClick={() => {
                                        setSelectedInvoice(item);
                                        setShippingStatus(item.shipping[0].status);
                                        openModal();
                                    }}>
                                        {statusColor(item.length > 0 && item.shipping[0].status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dateFormatter(item.date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a className="font-medium text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => {
                                                setSelectedInvoice(item);
                                                setViewDetail(true);
                                            }}>View</a>
                                    </td>
                                </tr>

                            )
                        })
                    }

                </tbody>
            </table>


        </div>
    )
}


export default ViewAdminInvoiceComp;