import React from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import './RegisterScreen.css' // No te olvides de importar el CSS

const RegisterScreen = () => {
    const {loading, error, response, sendRequest} = useRequest()

    const form_initial_state = {
        username: '',
        password: '',
        email: ''
    }

    async function enviarRegistro (form_state){
        sendRequest(
            () => {
                return register(form_state.username, form_state.password, form_state.email)
            }
        )
    }

    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm
    } = useForm(
        {
            initial_form_fields: form_initial_state,
            onSubmit: enviarRegistro
        }
    )

  return (
    <div className="register-container">
        <div className="register-card">
            <h1 className="register-title">Registrate en la aplicacion</h1>
            <form className="register-form" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="username" 
                        name="username" 
                        value={form_state.username} 
                        onChange={onChangeFieldValue} 
                        placeholder="Tu usuario"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        className="form-input"
                        type="password" 
                        id="password" 
                        name="password" 
                        value={form_state.password} 
                        onChange={onChangeFieldValue} 
                        placeholder="••••••••"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        className="form-input"
                        type="email" 
                        id="email" 
                        name="email" 
                        value={form_state.email} 
                        onChange={onChangeFieldValue}
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                {error && <span className="error-message">{error.message}</span>}
                
                {response && response.ok && (
                    <span className="success-message">
                        Usuario registrado exitosamente, te enviaremos un mail con instrucciones.
                    </span>
                )}

                <button 
                    className="register-button" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            <span className="register-footer">
                Ya tienes una cuenta? <Link to="/login">iniciar sesion</Link>
            </span>
        </div>
    </div>
  )
}

export default RegisterScreen