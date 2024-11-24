import { dateFormatter } from "@/db.supa.backend/utils";
import ViewAdminInvoiceComp from "./view.invoice.comp";
import { useInvoiceBackend, useShipUpdateStatusBackend } from "@/db.supa.backend/invoice.backend";
import { useState } from "react";
import DetailAdminInvoice from "./detail.invoice";
import InvoiceShipStatusModalAdmin from "../modal/invoice.ship.status.modal";


const AdminInvoiceComp = () => {
    const { invoice, loading, error, refreshInvoice } = useInvoiceBackend();
    const [viewDetail, setViewDetail] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState([]);
    const { loading: loadingUpdateStatus, shipStatusUpdate } = useShipUpdateStatusBackend();
    const [shippingStatus, setShippingStatus] = useState('');

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleRefresh = async () => {
        await refreshInvoice()
    }


    return (
        <div>

            {
                !viewDetail ? <ViewAdminInvoiceComp invoice={invoice} setViewDetail={setViewDetail} setSelectedInvoice={setSelectedInvoice} openModal={openModal} setShippingStatus={setShippingStatus}/> :
                    <DetailAdminInvoice setViewDetail={setViewDetail} selectedInvoice={selectedInvoice} />
            }
            {
                isModalOpen?<InvoiceShipStatusModalAdmin isOpen={isModalOpen} onClose={closeModal} selectedInvoice={selectedInvoice} handleRefresh={handleRefresh} loading={loadingUpdateStatus} shipStatusUpdate={shipStatusUpdate} shippingStatus={shippingStatus} setShippingStatus={setShippingStatus} />:""
            }
            
        </div>

    )
}


export default AdminInvoiceComp;