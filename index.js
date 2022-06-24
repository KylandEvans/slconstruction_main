if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const validation = require("./assets/JS/validation");
const helmet = require("helmet");

app.use(express.static("assets"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const scripts = ["https://cdn.jsdelivr.net"];

const styles = ["https://cdn.jsdelivr.net"];

const defaultSrc = ["https://www.google.com/"];

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", ...scripts],
			"frame-src": ["'self'", ...defaultSrc],
			"style-src": ["'self'", "'unsafe-inline'", ...styles],
		},
	})
);

app.use((req, res, next) => {
	res.header("Cross-Origin-Embedder-Policy", "cross-origin");
	next();
});

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/projects", (req, res) => {
	res.render("projects");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.get("/reviews", (req, res) => {
	res.render("reviews");
});

app.post("/send", (req, res) => {
	if (validation.contactFormValidation(req.body)) {
		res.render("contact");
	}
	const uniqueID = () => {
		let UUID = "";
		for (let i = 0; i < 16; i++) {
			const numID = Math.floor(Math.random() * 9).toString();
			UUID = UUID.substring(0) + numID;
		}
		return UUID;
	};

	const requestID = uniqueID();
	const output = `
						<h1>You have a new Request</h1>
						<h3>Name: </h3>
						<p>${req.body.personName}</p>
						<h3>Service Address: </h3>
						<p>${req.body.address}</p>
						<h3>Phone Number: </h3>
						<p>${req.body.phone}</p>
						<h3>Email Address: </h3>
						<p>${req.body.email}</p>
						<h3>Description of Job: </h3>
						<p>${req.body.description}</p>
						<h3>The Unique ID for this request is: </h3>
						<p>${requestID}</p>
	`;

	async function mainMailer() {
		let transporter = nodemailer.createTransport({
			host: "smtp-mail.outlook.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.SMTP_AUTH_USER,
				pass: process.env.SMTP_AUTH_PASS,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail(
			{
				from: "slconstruction.confermation@outlook.com",
				to: "kylandevans@gmail.com", // This is where sky's email address will go!
				subject: `New Quote Request From ${req.body.personName}`,
				html: output,
			},
			(error, info) => {
				if (error) {
					console.error(error);
					res.send("<h1>Unable to send email. Try again later</h1>");
				} else {
					console.log(info.messageId);
					const custOutput = `
											<h1>Your request has been successfully sent</h1>
											<h3>Name: </h3>
											<p>${req.body.personName}</p>
											<h3>Service Address: </h3>
											<p>${req.body.address}</p>
											<h3>Phone Number: </h3>
											<p>${req.body.phone}</p>
											<h3>Email Address: </h3>
											<p>${req.body.email}</p>
											<h3>Description of Job: </h3>
											<p>${req.body.description}</p>
											<h3>Your unique id for this request is: </h3>
											<p>${requestID}</p>

					`;
					async function mainMailer() {
						let transporter = nodemailer.createTransport({
							host: "smtp-mail.outlook.com",
							port: 587,
							secure: false, // true for 465, false for other ports
							auth: {
								user: process.env.SMTP_AUTH_USER,
								pass: process.env.SMTP_AUTH_PASS,
							},
						});

						// send mail with defined transport object
						let info = await transporter.sendMail(
							{
								from: " slconstruction.confermation@outlook.com",
								to: `${req.body.email}`,
								subject: `Request Confirmation`,
								html: custOutput,
							},
							(error, info) => {
								if (error) {
									console.error(error);
									res.send("<h1>Unable to send email. Try again later</h1>");
								} else {
									console.log(info.messageId);

									res.send("<h1>Email sent Successfully</h1>");
								}
							}
						);
					}
					mainMailer().catch(e => console.error(e));
					res.render("submissionSuccess", { vars: req.body });
				}
			}
		);
	}
	mainMailer().catch(e => console.error(e));
});

app.all("*", (req, res) => {
	res.status(404).render("error");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
