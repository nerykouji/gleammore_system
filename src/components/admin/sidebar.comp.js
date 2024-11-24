
const Sidebar = ({ activeItem, setActiveItem }) => {
    const menuItems = ['Dashboard', 'Users','Products','Invoice'];

    return (
        <div className="bg-gray-800 text-white w-64 h-full">
            <h2 className="text-xl p-4">Gleammore Admin</h2>
            <ul>
                {menuItems.map(item => (
                    <li
                        key={item}
                        className={`p-4 hover:bg-gray-700 ${activeItem === item ? 'bg-gray-700' : ''}`}
                        onClick={() => setActiveItem(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;