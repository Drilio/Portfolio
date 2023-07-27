export default function ContactForm() {

    function handleSubmit(event) {
        event.preventDefault();

        let form = document.getElementById("contact-form");
        let formData = new FormData(form);
        let name = formData.get("name");

        // Regex pour valider le nom de la langue (lettres, chiffres et espaces autorisés)
        const regexName = /^[a-zA-Z0-9\s]+$/;
        if (regexName.test(name)) {
            fetch('http://localhost:3000/api/send', {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.status === 'success') {
                        alert("Message Sent.");
                        this.resetForm()
                    } else if (res.status === 'fail') {
                        alert("Message failed to send.")
                    }
                })
                .catch(error => {
                    console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
                });
        } else if (!regexName.test(name)) {
            alert("Veuillez entrer un nom valide (lettres, chiffres et espaces autorisés).");
        }
    }
    return (
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )

}