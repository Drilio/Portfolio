import { useParams } from "react-router-dom";

export default function DeleteProject() {
    const { id } = useParams();

    async function DeleteThisProject() {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('responseToken')}`,
                },
            });
            document.location.href = "../";
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div>
            <button className="delete-project-button" onClick={() => DeleteThisProject()}>Supprimer le projet</button>
        </div>
    )

}