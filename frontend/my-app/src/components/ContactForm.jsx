export default function ContactForm() {

    function handleSubmit(event) {
        event.preventDefault();
        let form = document.getElementById("contact-form");
        let email = event.target.querySelector("[name=email]").value;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let name = event.target.querySelector("[name=name]").value;
        let nameRegex = /^[a-zA-Z]{1,20}\d{0,3}$/;
        let message = event.target.querySelector('[name=message]').value;
        let regexMessage = /^[a-zA-Z0-9\s.,!?'"()\-]*$/;
        // Regex pour valider le nom de la langue (lettres, chiffres et espaces autorisés)
        if (nameRegex.test(name) && emailRegex.test(email) && regexMessage.test(message)) {
            let body = {
                email: email,
                name: name,
                message: message
            };
            fetch('http://localhost:3000/api/send', {
                method: "POST",
                headers: { "Content-Type": "application/json", "accept": "application/json" },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.status === 'success') {
                        alert("Message Sent.");
                        form.reset();
                    } else if (res.status === 'fail') {
                        alert("Message failed to send.")
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Oups, ça n\'a pas fonctionné comme prévu !')
                });
        } else if (!nameRegex.test(name)) {
            alert("Veuillez entrer un nom valide (lettres, chiffres et espaces autorisés).");
        }
    }
    return (
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input name="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )

}