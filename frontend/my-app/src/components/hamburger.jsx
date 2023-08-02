
export default function Hamburger(isOpen) {

    return (
        <>
            <div className="hamburger">
                <div className={isOpen ? "burger burger1-open" : "burger burger1"}></div>
                <div className={isOpen ? "burger burger2-open" : "burger burger2"}></div>
                <div className={isOpen ? "burger burger3-open" : "burger burger3"}></div>
            </div>
        </>
    )
}