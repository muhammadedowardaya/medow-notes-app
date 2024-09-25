import React from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";

import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function LoginPage({ loginSuccess }) {
    const { locale } = React.useContext(LocaleContext);

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
        <div id="form-page" className="flex items-center justify-center flex-col pt-10">
            <h1 className="text-center p-4 text-[120%] font-bold">
                {locale === "id"
                    ? "Ayo, Login untuk menggunakan aplikasi!"
                    : "Come on, log in to use the application!"}
            </h1>
            <form onSubmit={onSubmitHandler} className="w-full max-w-[30%] p-6 pt-8 mx-auto bg-[#424242] text-slate-300 rounded-md">
                <div className="grid grid-cols-[max-content_auto] gap-3">
                    <label htmlFor="email" className="row-start-1 col-start-1 mr-8">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChangeHandler}
                        className="border rounded row-start-1 col-start-2 px-2 text-slate-600 w-full"
                    />
                    <label htmlFor="password" className="row-start-2 col-start-1 mr-8">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onPasswordChangeHandler}
                        className="border rounded row-start-2 col-start-2 px-2 text-slate-600 w-full"
                    />
                </div>
                <div className="button-group space-y-2 mt-4">
                    <button type="submit" className="bg-sky-400 text-white px-4 pb-[2px] w-full block">Login</button>
                    <div className="flex items-center gap-x-2 justify-center">
                        <span>
                            {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}
                        </span>
                        <Link to="/register">{locale === "id" ? "Daftar di sini" : "Register here"}</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
};
