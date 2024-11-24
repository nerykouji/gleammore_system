

import { useState } from 'react';

const EditAdminUserComp = ({ selectedUser, setEditing, handleRefresh, updateUser, loadingUpdate }) => {
    const [formData, setFormData] = useState({
        id: selectedUser ? selectedUser.id : '',
        name: selectedUser ? selectedUser.name : '',
        email: selectedUser ? selectedUser.email : '',
        address: selectedUser ? selectedUser.address : '',
        contact_no: selectedUser ? selectedUser.contact_no : '',
        sex: selectedUser ? selectedUser.sex : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(formData)
        handleRefresh();
        setEditing(false)
    };

    return (
        <div className='bg-gray-50 shadow-md rounded w-full'>

            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4  max-w-lg">

                <button className='bg-orange-200 p-2 rounded-sm text-sm my-5' onClick={() => {
                    setEditing(false);
                }} > Back </button>

                <div className="mb-4">
                    <h1 className='text-2xl'>
                        Update / {selectedUser.username || ""}
                    </h1>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your address"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_no">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contact_no"
                        name="contact_no"
                        value={formData.contact_no}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your contact number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
                        Sex
                    </label>
                    <select
                        id="sex"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select your sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button type="submit" className={`${loadingUpdate ? "bg-gray-300" : "bg-blue-500"} hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    disabled={loadingUpdate}>
                    Update
                </button>
            </form>

        </div>
    );
};

export default EditAdminUserComp;