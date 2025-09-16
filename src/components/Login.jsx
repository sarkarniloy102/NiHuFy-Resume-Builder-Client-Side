import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { authStyles } from "../assets/dummystyle";
import { Input } from "./Inputs";

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return;
        }
        if (!password) {
            setError('Please enter password')
            return;
        }

        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });

            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard')
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong.Please try again')
        }
    }
    return (
        <div className={authStyles.container}>
            <div className={authStyles.headerWrapper}>
                <h3 className={authStyles.title}>
                    Welcome Back
                </h3>
                <p className={authStyles.subtitle}>
                    Sign in to continue building amazing resumes
                </p>
            </div>

            {/* form */}
            <form className={authStyles.form} onSubmit={handleLogin}>
                {/* email */}
                <Input value={email} onChange={({ target }) => setEmail(target.value)}
                    label={'Email'}
                    placeholder='example@gmail.com'
                    type="email" />
                {/* password */}
                <Input value={password} onChange={({ target }) => setPassword(target.value)}
                    label={'Password'}
                    placeholder='Password should be minimum 8 Characters'
                    type="password" />

                {
                    error && <div className={authStyles.errorMessage}>{error}</div>

                }
                <button type="submit" className={authStyles.submitButton}>
                    LogIn
                </button>
                {/* footer */}
                <p className={authStyles.switchText}>
                    Don't have an account?{' '}
                    <button type="button"
                        onClick={() => { setCurrentPage('signup') }}
                        className={authStyles.signupSwitchButton}>SignUp</button>
                </p>
            </form>

        </div>
    );
};

export default Login;