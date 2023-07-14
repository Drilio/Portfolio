import { useState } from "react";
// a refaire : fetch les catégories de language et ittérer avec un map

export default function addProjects() {
    function Form() {
        const [title, setFirstName] = useState("")
        const [languages, setLastName] = useState("")
        const [image, setAge] = useState("")
    }

    return (
        <div>
            <form className="add-projects-form">
                <label>Titre du projet</label>
                <input type="text" id="madd-projects-form-title" placeholder="Entrer le titre du projet" name="titre" required></input>
                <fieldset>
                    <legend>languages utilisé</legend>
                    <div>
                        <input type="checkbox" id="html" name="html"></input>
                        <label htmlFor="html">HTML</label>
                    </div>

                    <div>
                        <input type="checkbox" id="css" name="css"></input>
                        <label htmlFor="css">CSS</label>
                    </div>
                    <div>
                        <input type="checkbox" id="javascript" name="javascript"></input>
                        <label htmlFor="javascript">JavaScript</label>
                    </div>
                </fieldset>
                <div className="upload-img-section">
                    <img id="img-preview" src="#" alt=""></img>
                    <label htmlFor="upload-image">+ Ajouter photo</label>
                    <input required type="file" id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                </div>
                <input type="submit" id='add-projects-form-submit' value='Créer le projet'></input>
            </form>

        </div>
    )
}