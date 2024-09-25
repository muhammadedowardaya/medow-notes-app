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
        <div id="form-page" className="pt-10">
            <h1 className="text-center p-4 text-[120%] font-bold">Isi form untuk mendaftar akun</h1>
            <form onSubmit={onSubmitHandler} className="w-full max-w-[30%] p-6 pt-8 mx-auto bg-[#424242] text-slate-300 rounded-md">
                <div className="grid grid-cols-[max-content_auto] gap-3">
                    <label htmlFor="name" className="row-start-1 col-start-1 mr-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onNameChangeHandler}
                        className="border rounded row-start-1 col-start-2 px-2 text-slate-600 w-full"
                    />
                    <label htmlFor="email" className="row-start-2 col-start-1 mr-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChangeHandler}
                        className="border rounded row-start-2 col-start-2 px-2 text-slate-600 w-full"
                    />
                    <label htmlFor="password" className="row-start-3 col-start-1 mr-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onPasswordChangeHandler}
                        className="border rounded row-start-3 col-start-2 px-2 text-slate-600 w-full"
                    />
                    <label htmlFor="confirm-password" className="row-start-4 col-start-1 mr-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChangeHandler}
                        className="border rounded row-start-4 col-start-2 px-2 text-slate-600 w-full"
                    />
                </div>
                <div className="button-group space-y-2 mt-6">
                    <button type="submit" className="bg-sky-400 text-white px-4 pb-[2px] w-full block">Register</button>
                    <div className="flex items-center gap-x-2 justify-center">
                        <span>
                            {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}
                        </span>
                        <Link to="/login">
                            {locale === "id" ? "Login di sini" : "Login here"}
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
