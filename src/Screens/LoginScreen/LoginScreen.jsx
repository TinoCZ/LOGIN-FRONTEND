import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { login } from '../../services/authService'
import './LoginScreen.css'

const LoginScreen = () => {
    const navigate = useNavigate()
    const initialLoginForm = {
        email: '',
        password: ''
    }
    const { response, error, loading, sendRequest } = useRequest()

    function logearse (form_state){
        sendRequest(
            () => {
                return login(form_state.email, form_state.password)
            }
        )
    }

    const {
        onChangeFieldValue, 
        onSubmitForm, 
        form_state
    } = useForm({ 
        initial_form_fields: initialLoginForm, 
        onSubmit: logearse 
    })
    
    useEffect(
        () => {
            if(response && response.ok){
                localStorage.setItem('auth_token', response.data.auth_token)
                navigate('https://tinocz.github.io/SHIN-PORTFOLIO/')
            }
        }, 
        [response]
    )

  return (
    <div className="login-container">
        <div className="login-card">
            <h1 className="login-title">Inicia sesion</h1>
            <form className="login-form" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-input"
                        onChange={onChangeFieldValue} 
                        value={form_state.email} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="form-input"
                        onChange={onChangeFieldValue} 
                        value={form_state.password} 
                    />
                </div>
                
                {error && <span className="error-message">{error.message}</span>}
                
                {response && response.ok && (
                    <span className="success-message">
                        Te has logueado exitosamente
                    </span>
                )}

                <button 
                    className="login-button" 
                    type="submit" 
                    disabled={loading || (response && response.ok)}
                >
                    {loading ? 'Cargando...' : 'Iniciar sesion'}
                </button>
            </form>
            <span className="login-footer">
                Aun no tienes cuenta? <Link to="/register">Registrate</Link>
            </span>
        </div>
    </div>
  )
}

export default LoginScreen