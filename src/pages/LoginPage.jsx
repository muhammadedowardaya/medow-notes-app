import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";

import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function LoginPage({ loginSuccess }) {
	const { locale } = React.useContext(LocaleContext);
	const navigate = useNavigate();

	const [email, onEmailChangeHandler] = useInput("");
	const [password, onPasswordChangeHandler] = useInput("");

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const { error, data } = await login({
			email,
			password,
		});

		if (!error) {
			loginSuccess(data);
		}
	};

	return (
		<div id="form-page">
			<form onSubmit={onSubmitHandler}>
				<h1>
					{locale === "id"
						? "Ayo, Login untuk menggunakan aplikasi!"
						: "Come on, log in to use the application!"}
				</h1>
				<label htmlFor="email">
					Email
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={onEmailChangeHandler}
					/>
				</label>
				<label htmlFor="password">
					Password
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={onPasswordChangeHandler}
					/>
				</label>
				<div className="button-group">
					<button type="submit">Login</button>
					<span>
						{locale === "id" ? "Belum punya akun?" : "Don't have an account?"}
					</span>
					<Link to="/register">{locale === "id" ? "Daftar di sini" : "Register here"}</Link>
				</div>
			</form>
		</div>
	);
}

LoginPage.propTypes = {
	loginSuccess: PropTypes.func.isRequired,
};
