import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

export default function RegisterPage() {
    const { locale } = React.useContext(LocaleContext);
	const navigate = useNavigate();

	const [name, onNameChangeHandler] = useInput("");
	const [email, onEmailChangeHandler] = useInput("");
	const [password, onPasswordChangeHandler] = useInput("");
	const [confirmPassword, onConfirmPasswordChangeHandler] = useInput("");

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (password === confirmPassword) {
			const { error } = await register({
				name,
				email,
				password,
			});

			if (!error) {
				navigate("/login");
			}
		}
	};

	return (
		<div id="form-page">
			<form onSubmit={onSubmitHandler}>
				<h1>Isi form untuk mendaftar akun</h1>
				<label htmlFor="name">
					Name
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={onNameChangeHandler}
					/>
				</label>
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
				<label htmlFor="confirm-password">
					Confirm Password
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						value={confirmPassword}
						onChange={onConfirmPasswordChangeHandler}
					/>
				</label>
				<div className="button-group">
					<button type="submit">Register</button>
					<span>
						{locale === "id" ? "Sudah punya akun?" : "Already have an account?"}
					</span>
					<Link to="/login">
						{locale === "id" ? "Login di sini" : "Login here"}
					</Link>
				</div>
			</form>
		</div>
	);
}
