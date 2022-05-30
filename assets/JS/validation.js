module.exports = {
	contactFormValidation: body => {
		const validateEmail = email => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};
		if (body.personName.length <= 0) {
			return true;
		}

		if (body.address.length <= 0) {
			return true;
		}

		if (body.phone.length < 18) {
			return true;
		}

		if (!validateEmail(body.email)) {
			return true;
		}

		if (body.description <= 0) {
			return true;
		}

		return false;
	},
};
