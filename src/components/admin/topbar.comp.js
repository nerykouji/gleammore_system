import { useState } from "react";
import Modal from "../x/model.util";


const TopBar = ({ visible, setVisible }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleToggle = () => {
        if (visible) setVisible(false)
        else setVisible(true)
    }

    return (
        <div className="bg-gray-800 text-white h-16 flex items-center justify-between px-4">
            {/* <h1 className="text-xl">Dashboard</h1> */}
            <button onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-8 h-8" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <div onClick={openModal} className="cursor-pointer">Admin</div>
        </div>
    );
};

export default TopBar;