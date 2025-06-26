function DeleteModal({ openModal, closeModal, children }) {
  return (
    // Backdrop
    <div onClick={closeModal} className={`fixed inset-0 justify-center items-center transition-colors
      ${openModal ? "visible bg-black/20" : "invisible"}`}>
      
      {/* Modal */}
      <div onClick={(e) => e.stopPropagation()} className={`bg-white w-75 transform translate-x-153 translate-y-55 rounded-xl shadow p-6 transition-all 
        ${openModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
        <button onClick={closeModal} className="absolute top-1 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
          <p className="text-2xl">X</p>  
        </button>        
        { children }
      </div>
    
    </div>
  );
}

export default DeleteModal;
