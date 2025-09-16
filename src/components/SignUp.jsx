import { useContext, useState } from "react";
import { authStyles } from "../assets/dummystyle";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Input } from "./Inputs";

const SignUp = ({ setCurrentPage }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName) {
            setError('Please enter FullName')
            return;
        }
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
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password
            });
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
        <div className={authStyles.signupContainer}>
            <div className={authStyles.headerWrapper}>
                <h3 className={authStyles.signupTitle}>Create Account</h3>
                <p className={authStyles.signupSubtitle}>Join thousands of professional today </p>

            </div>

            {/* form */}
            <form onSubmit={handleSignUp}
                className={authStyles.signupForm}>
                {/* name */}
                <Input value={fullName} onChange={({ target }) => setFullName(target.value)}
                    label={'Full Name'}
                    placeholder='Type your fullname'
                    type="text" />
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
                <button type="submit" className={authStyles.signupSubmit}>Create Account Here</button>

                {/* footer */}
                <p className={authStyles.switchText}>
                    Already have an account?{' '}
                    <button type="button"
                        onClick={() => { setCurrentPage('login') }}
                        className={authStyles.signupSwitchButton}>LogIn</button>
                </p>
            </form>

        </div>
    );
};

export default SignUp;