


const ViewAdminUsersComp = ({ users, setEditing, setAdding, setSelectedUser, setViewCart }) => {



    return (
        <div className="mt-10">

            <button className='bg-orange-200 p-2 rounded-sm text-sm my-5' onClick={() => {
                setAdding(true);
            }} > Add User </button>

            <table className="table-auto w-full text-sm text-left text-gray-500 border ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sex
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.username}
                                </th>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.address}
                                </td>
                                <td className="px-6 py-4">
                                    {user.contact_no}
                                </td>
                                <td className="px-6 py-4">
                                    {user.sex}
                                </td>
                                <td className="px-6 py-4">
                                    <a className="font-medium text-blue-600 hover:underline cursor-pointer mr-1" onClick={() => {
                                        setSelectedUser(user)
                                        setEditing(true);
                                    }} >Edit</a>
                                    <a className="font-medium text-yellow-600 hover:underline cursor-pointer mr-1" onClick={() => {
                                        setSelectedUser(user)
                                        setViewCart(true);
                                    }} >Cart</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}


export default ViewAdminUsersComp;