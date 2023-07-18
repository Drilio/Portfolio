import docCV from "../Documents/CVAntoineROY.pdf"

export default function DownloadCV() {
    return (
        <div>
            <a href={docCV} rel="noreferrer" download="MyCV" target='_blank'>
                <button>Télécharger mon CV !</button>
            </a>
        </div>
    )
}