const app = {
	init: () => {
		document.addEventListener("DOMContentLoaded", app.load);
		console.log("Dom Content Loaded");
	},
	load: () => {
		app.getPage();
	},
	getPage: () => {
		let page = document.body.id;
		switch (page) {
			case "home":
				app.loadHome();
				break;
			case "projects":
				app.loadProjects();
				break;
			case "about":
				app.loadAbout();
				break;
			case "contact":
				app.loadContact();
				break;
			case "reviews":
				app.loadReviews();
				break;
			default:
				app.loadSomethingElse();
		}
	},
	loadHome: () => {},
	loadProjects: () => {
		const projectImage = document.querySelectorAll(".project-image");
		const close = document.querySelector(".close-wrapper");
		const body = document.querySelector(".body");
		const html = document.querySelector("html");

		projectImage.forEach(image => {
			image.addEventListener("click", () => {
				image.classList.add("image-view");
				image.classList.remove("project-image");
				body.classList.add("noscroll");
				html.classList.add("noscroll");
				image.style.top = window.scrollY + "px";
				close.style.display = "flex";
				close.style.top = window.scrollY + 5 + "px";
			});
		});

		close.addEventListener("click", () => {
			projectImage.forEach(image => {
				if (image.classList.contains("image-view")) {
					image.classList.remove("image-view");
					image.classList.add("project-image");
					body.classList.remove("noscroll");
					html.classList.remove("noscroll");
					close.style.display = "none";
				}
			});
		});
	},
	loadAbout: () => {},
	loadContact: () => {
		// FIX: Working on validating form information.
		// FIX: Need to add confirmation email to be sent back to requester
		const nameInput = document.querySelector(".personName");
		const addressInput = document.querySelector(".address");
		const phoneInput = document.querySelector(".phone-input");
		const emailInput = document.querySelector(".email-input");
		const descriptionInput = document.querySelector(".description");
		function phoneInputFormat() {
			let num = phoneInput.value.replace(/\D/g, "");
			if (num.length > 10) {
				num = num.substring(0, num.length - 1);
			}
			switch (num.length) {
				case 0:
					phoneInput.value = null;
					console.log("input is empty");
					break;
				case 4:
				case 5:
				case 6:
					phoneInput.value = null;
					phoneInput.value = `(${num.substring(0, 3)}) - ${num.substring(3)}`;
					console.log(phoneInput.value);
					break;
				case 7:
				case 8:
				case 9:
				case 10:
					phoneInput.value = null;
					phoneInput.value = `(${num.substring(0, 3)}) - ${num.substring(
						3,
						6
					)} - ${num.substring(6)}`;
				default:
					console.log(phoneInput.value.length);
					break;
			}
			console.log(num);
		}

		const validateName = name => {
			if (name.length) {
				return true;
			}
		};

		const validateEmail = email => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};

		phoneInput.addEventListener("input", phoneInputFormat);
		function validateForm() {
			if (!validateName(nameInput.value)) {
				nameInput.style.border = "1px solid red";
			} else {
				nameInput.style.border = "1px solid green";
			}

			if (addressInput.value.length <= 0) {
				addressInput.style.border = "1px solid red";
			} else {
				addressInput.style.border = "1px solid green";
			}

			if (phoneInput.value.length < 18) {
				phoneInput.style.border = "1px solid red";
			} else {
				phoneInput.style.border = "1px solid green";
			}

			if (!validateEmail(emailInput.value)) {
				emailInput.style.border = "1px solid red";
			} else {
				emailInput.style.border = "1px solid green";
			}

			if (descriptionInput.value.length <= 0) {
				descriptionInput.style.border = "1px solid red";
			} else {
				descriptionInput.style.border = "1px solid green";
			}

			if (
				nameInput.value.length <= 0 &&
				addressInput.value.length <= 0 &&
				phoneInput.value.length <= 18 &&
				descriptionInput.value.length <= 0
			) {
				return true;
			} else {
				return false;
			}
		}

		nameInput.addEventListener("input", validateForm);
		addressInput.addEventListener("input", validateForm);
		phoneInput.addEventListener("input", validateForm);
		emailInput.addEventListener("input", validateForm);
		descriptionInput.addEventListener("input", validateForm);
	},
	loadReviews: () => {},
	loadSomethingElse: () => {},
};
app.init();
