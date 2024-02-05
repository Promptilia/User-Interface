
const Navbar = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between">
        <div className="flex items-center space-x-4">
          <a href="/chatwidget">
            {/* Cute chat icon */}
            <img src="/icons/chat-icon.png" alt="Chat" className="w-8 h-8" />
          </a>
          <p>Chat</p>
        </div>
<div className="flex items-center space-x-4">
<a href="/mainpage"><img src="tutorial\app\icons\e-commerace.png" alt="Home" className="w-8 h-8" /></a>
          <img src="/icons/cart-icon.png" alt="Cart" className="w-8 h-8" />
          <img src="/icons/profile-icon.png" alt="Profile" className="w-8 h-8" />
        </div>
</footer>
)};


export default Navbar;