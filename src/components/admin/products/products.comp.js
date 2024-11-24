import { useProductsBackend } from "@/db.supa.backend/products.backend";
import AddAdminProductComp from "./add.product.comp";
import ViewAdminProductsComp from "./view.products.comp";
import { useState } from "react";
import EditAdminProductComp from "./edit.product.comp";



const AdminProductsComp = () => {
    const { products, loading, error, refreshProducts } = useProductsBackend();
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleRefresh = () => {
        refreshProducts();
    }

    return (
        <div>

            <div>Manage the products here.</div>

            <div className="relative overflow-x-auto">

                {!adding && !editing ? <ViewAdminProductsComp products={products} setSelectedProduct={setSelectedProduct} setEditing={setEditing} setAdding={setAdding}/> : ""}
                {adding && !editing ? <AddAdminProductComp setAdding={setAdding} handleRefresh={handleRefresh} /> : ""}
                {!adding && editing ? <EditAdminProductComp setEditing={setEditing} handleRefresh={handleRefresh} selectedProduct={selectedProduct} /> : ""}



            </div>


        </div>
    )
}


export default AdminProductsComp;