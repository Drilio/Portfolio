import docCV from "../Documents/CVAntoineROY.pdf"

export default function DownloadCV() {
    return (
        <div>
            <a href={docCV} rel="noreferrer" download="MyCV" target='_blank' className="link-download">
                Télécharger mon CV !
            </a>
        </div>
    )
}