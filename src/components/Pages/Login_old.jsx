import React from 'react'
import Axios from 'axios'

const authentication = e => {
  e.preventDefault();
  const form = e.target
  
  const data = {
    'username': form.username.value,
    'password': form.password.value,
    'grant_type': process.env.REACT_APP_API_GRANT_TYPE,
    'client_id': process.env.REACT_APP_API_CLIENT_ID,
    'client_secret': process.env.REACT_APP_API_CLIENT_SECRET
  }

  let messageErrors = [];
  
  if( form.username.value !== '' && form.password.value !== ''){
    const usernameSuccess = validateInput('username',Object.values(data)[0]);
    const emailSuccess = validateInput('password',Object.values(data)[1]);
    const API_URL = process.env.REACT_APP_API_URL
    if(usernameSuccess === true && emailSuccess === true){
      document.getElementById('errors').innerHTML = '<div class="loader text-center"><span class="span"></span></div>';
      // Se disablea el boton submit
      document.getElementById('submit').disabled = true
      Axios.post(`${API_URL}/login`, data)
        .then(r => {
          if(r.data.success){
            // console.log(r.data);
            // sessionStorage.setItem('userData', JSON.stringify(responseJSON));
            localStorage.setItem('token', r.data.data.access_token)
            localStorage.setItem('refresh_token', r.data.data.refresh_token)
            localStorage.setItem('user', JSON.stringify(r.data.data.user))
            localStorage.setItem('roles', JSON.stringify(r.data.data.roles))
            localStorage.setItem('options', JSON.stringify(r.data.data.navigation_options))
            localStorage.setItem('student_status', JSON.stringify(r.data.data.student_status))
            localStorage.setItem('categories', JSON.stringify(r.data.data.categories))

            if(r.data.data.student_status){
              localStorage.setItem('courses', JSON.stringify(r.data.data.courses))
            }

          
            //TODO Importante: pendiente realizar una peticion de validacion del token registrado en localStorage,
            // por si un usuario pndx coloca cualquier token desde el inspector del navegador, de lo contrario remover el token del storage mostrando un mensaje a ese usuario
            window.location = "/"
          }else{
            document.getElementById('errors').innerHTML = '<p class="text-danger">Por favor, vuelva a intentarlo en unos minutos.</p>';
          }
        })
        .catch(e => {
          document.getElementById('submit').disabled = false
          document.getElementById('errors').innerHTML = '<p class="text-danger">Error al iniciar sesión. Por favor, vuelva a intentarlo.</p>';
        })
      

    }else{
      
      if(usernameSuccess.success === false){
        messageErrors.push(usernameSuccess.error);
      }
      if(emailSuccess.success === false){
        messageErrors.push(emailSuccess.error);
      }
      console.log(messageErrors);
      let msj = '';
      messageErrors.map(function(e) {
        msj += '<p class="text-danger">'+e+'</p>';
        return true;
     });
     document.getElementById('errors').innerHTML = msj;
    }
    
  }else{
    document.getElementById('errors').innerHTML = '<p class="text-danger">Debe completar usuario y contraseña.</p>';
  }

}

const validateInput = (fieldName, value) => {  
  let fieldValid;
  let formError;
  switch (fieldName) {
    case 'username':
      fieldValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      formError = fieldValid ? '' : 'Correo electrónico es invalido.';
      break;
    case 'password':
      fieldValid = value.length >= 6;
      formError = fieldValid ? '': 'Contraseña tiene al menos 6 caracteres.';
      break;  
    default:
      break;
  }
  return (fieldValid) ? true : {'success': false,'error': formError};
}

const Login = () => {

  return (
    <div id="login" >
      <div style={{
        position: 'absolute',
        width: 100+'vw',
        height: 100+'vh',
        overflow: 'hidden'}}>      
        <iframe src="https://contenidoscev.usil.edu.pe/canvas/epg/mba-virtual/landing/background.html" title="bg" style={{width:100+'%', height:100+'vh'}}></iframe>
      </div>
      <div className="container pt-5">
        <br/><br/><br/><br/><br/>
        <div className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6" style={{backgroundColor: 'rgba(0,0,0,.65)', padding: 20+'px'}}>
            <div id="login-box" className="col-md-12">
              <h1 className="center" style={{ color: 'white' }}>Iniciar sesión en Chanvas</h1>
              <form onSubmit={authentication.bind()} className="form" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username" className="text-light" style={{width: 100+'%'}}>
                    Correo electrónico
                    <input type="email" name="username" id="username" className="form-control" required/>
                    <input autoComplete="false" name="hidden" type="text" style={{display: 'none'}} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-light" style={{width: 100+'%'}}>
                    Contraseña
                    <input type="password" name="password" id="password" className="form-control" required/>
                  </label>
                </div>
                <div className="form-group">
                  <input id="submit" type="submit" name="submit" className="btn btn-outline-light btn-md" value="Iniciar sesión"/>
                </div>
              </form>
              <div id="errors" style={{textAlign:'center'}}>
                
                
                
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default Login
