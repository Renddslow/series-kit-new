$(() => {
	$('#sign-up').submit(e => {
		e.preventDefault();
		const data = {
			firstName: $('#first-name').val().trim(),
			lastName: $('#last-name').val().trim(),
			email: $('#email').val().trim(),
			password: $('#password').val().trim(),
			church: $('#church').val().trim()
		};
		window.firebase.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then(res => ({ id: res.uid, token: res.G }))
			.then(({ id, token }) => {
				data.id = id;
				data.firstTimeToken = token;
				delete data.password;
				window.firebase.database()
					.ref(`users/${id}`)
					.set(data);
				window.location.href = `https://portal.serieskit.church?token=${data.firstTimeToken}`;
			});
		return false;
	});
});
