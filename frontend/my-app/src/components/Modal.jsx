import '../style/modal.css'

export default function Modal({ isOpen, content }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                {content}
            </div>
        </div>
    );

}
