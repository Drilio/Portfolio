import '../style/modal.css'

export default function Modal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button onClick={onClose} className="close-button">
                    X
                </button>
                <h2>{title}</h2>
                {content}
            </div>
        </div>
    );

}
