import '../style/spinner.css'
import { useState, useEffect } from 'react';

export default function Spinner({ onLoadingComplete }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            onLoadingComplete();
        }, 1000);
    }, [onLoadingComplete]);

    return (
        <div className="loader-container">
            {loading && <div className="lds-ripple"><div></div><div></div></div>}
        </div>
    );
}