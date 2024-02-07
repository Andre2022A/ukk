import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, authToken } = useAuth();

    useEffect(() => {
        // Check if the user is already authenticated on component mount
        if (authToken) {
            navigate('/admin');
        }
    }, [authToken, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                login(response.data.data.token, response.data.data.name, response.data.data.id, response.data.data.foto_user);
                navigate('/admin'); // Redirect to /admin on successful login
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="ui form" onSubmit={handleLogin}>
                <h1 className="form-title">Selamat Datang</h1>
                <p className="welcome-message">Silakan login untuk melanjutkan.</p>
                <div className="field">
                    <input
                        type="text"
                        name="username"
                        placeholder="Masukkan Username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control form-control-user"
                    />
                </div>
                <div className="field">
                    <input
                        type="password"
                        name="password"
                        placeholder="Masukkan Password.."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-user"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-dark btn-user btn-block">
                        Login
                    </button>
                </div>
                <hr />
                <div className="text-center register-link">
                    <p className="small">
                        Belum punya akun? <Link to="/register" className="register-link-text">Register!</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;