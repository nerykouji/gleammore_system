import { useAddUserBackend, useUpdateUserBackend, useUsersBackend } from "@/db.supa.backend/users.backend";
import { useEffect, useState } from "react";
import ViewAdminUsersComp from "./view.users.comp";
import EditAdminUserComp from "./edit.user.comp";
import AddAdminUserComp from "./add.user.comp";
import CartAdminUserComp from "./cart.user.comp";


const AdminUsersComp = () => {
    const { response: responseAdd, loading: loadingAdd, error: errorAdd, addUser } = useAddUserBackend();
    const { response: responseUpdate, loading: loadingUpdate, error: errorUpdate, updateUser } = useUpdateUserBackend();
    const { users, loading: loadingUsers, error: errorUsers, refreshUsers } = useUsersBackend();
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [viewCart, setViewCart] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRefresh = () => {
        refreshUsers()
    }

    return (
        <div>
       
            <div className="relative overflow-x-auto">
                {/* View */}
                {!editing && !adding && !viewCart ? <ViewAdminUsersComp users={users} setEditing={setEditing} setAdding={setAdding} setSelectedUser={setSelectedUser} setViewCart={setViewCart} /> : ""}
                {/* Add */}
                {!editing && adding && !viewCart ? <AddAdminUserComp setAdding={setAdding} addUser={addUser} handleRefresh={handleRefresh} loadingAdd={loadingAdd} /> : ""}
                {/* Edit */}
                {editing && !adding && !viewCart ? <EditAdminUserComp updateUser={updateUser} setEditing={setEditing} selectedUser={selectedUser} handleRefresh={handleRefresh} loadingUpdate={loadingUpdate} /> : ""}
                {/* Cart */}
                {!editing && !adding && viewCart ? <CartAdminUserComp selectedUser={selectedUser} setViewCart={setViewCart} /> : ""}

            </div>


        </div>
    )
}

export default AdminUsersComp;



