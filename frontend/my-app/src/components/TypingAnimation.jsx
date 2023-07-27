import React, { useState, useEffect } from 'react';

const backDelay = 5000; // Le temps entre les loops

const TypingAnimation = ({ texts }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isErasing, setIsErasing] = useState(false);

    useEffect(() => {
        const textToType = texts[currentIndex];

        if (isErasing) {
            if (currentText.length === 0) {
                // Quand on a fini d'effacer, on passe à l'écriture du texte suivant
                setIsErasing(false);
                setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
            }
        } else {
            if (currentText === textToType) {
                // Une fois finis d'écrire, on efface après X millisecondes
                setTimeout(() => setIsErasing(true), 7500);
            }
        }

        const interval = setInterval(() => {
            setCurrentText(prevText => {
                if (isErasing) {
                    // Effacement
                    return prevText.slice(0, -1);
                } else {
                    // Ecriture
                    return textToType.slice(0, prevText.length + 1);
                }
            });
        }, backDelay / (isErasing ? 150 : 75)); // Ajuster la vitesse d'ecriture et d'effacement

        return () => clearInterval(interval);
    }, [currentIndex, texts, isErasing, currentText]);

    return <span>{currentText}</span>;
};

export default TypingAnimation;