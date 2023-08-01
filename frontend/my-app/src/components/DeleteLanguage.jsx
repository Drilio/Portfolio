
export default function DeleteThisLanguage({ id }) {


    async function DeleteThisLanguage() {
        console.log('hey')
        try {
            const response = await fetch(`http://localhost:3000/api/languages/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('responseToken')}`,
                },
            });
            if (response.ok) {
                document.location.href = "./";
            } else {
                window.alert("Vous n'avez pas les autorisations nécessaires pour faire cela")
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div>
            <button className='modal-language-button js-delete-language' onClick={() => DeleteThisLanguage()}><i className="fa-solid fa-trash"></i></button>
        </div>
    )

}