import './App.css';
import {Formik, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {
  const handleClickLogin = (values) => {
    Axios.post("https://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) =>{
      console.log(response);
    });
  }
  const handleClickRegister = (values) => {
    Axios.post("https://localhost:3001/register", {
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      nomecompleto: values.nomecompleto,
      
    }).then((response)=> {
      alert(response.data.msg);
    });
  };
  
  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Não é um email")
    .required("Este campo é obrigatório"),
    password: yup
    .string()
    .min(8, "A senha deve conter 8 caracteres")
    .required("Este campo é obrigatório"),
  });

  
  const validationRegister = yup.object().shape({ 
    
    nome: yup
    .string()
    .required("Este campo é obrigatório"),
    cpf: yup
    .string()
    .min(9, "Digite sem traços ou pontos")
    .required("Este campo é obrigatório"),
    email: yup
    .string()
    .email("Não é um email")
    .required("Este campo é obrigatório"),
    password: yup
    .string()
    .min(8, "A senha deve conter 8 caracteres")
    .required("Este campo é obrigatório"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  
  });
 
  return (
  <div className="container">
    <h1>Login</h1>
    <Formik 
    initialValues={{}} 
    onSubmit={handleClickLogin} 
    validationSchema={validationLogin}>
      
      <form className="login-form">

        <div className="login-form-group">
          <Field name="email" className="form-field" placeHolder="Email" />

          <ErrorMessage 
          component="span" 
          name="email" 
          className="form-error" 
          />

         </div>

          <div className="login-form-group">
          <Field name="password" className="form-field" placeHolder="Senha" />

          <ErrorMessage 
          component="span" 
          name="password" 
          className="form-error" 
          />
        </div>
          <button className="button" type="submit">
            Login
          </button>

         </form>
    </Formik>

    <h1>Cadastro</h1>
    <Formik
    initialValues={{}} 
    onSubmit={handleClickRegister} 
    validationSchema={validationRegister}>
      
      <form className="login-form">

          <div className="login-form-group">
          <Field name="nome" className="form-field" placeHolder="Nome completo" />
          <ErrorMessage 
          component="span" 
          name="nome" 
          className="form-error" />
          
          <div className="login-form-group">
          <Field name="cpf" className="form-field" placeHolder="CPF" />
          <ErrorMessage 
          component="span" 
          name="cpf" 
          className="form-error" 
          />
          </div>

          <div className="login-form-group">
          <Field name="email" className="form-field" placeHolder="Email" />
          <ErrorMessage 
          component="span" 
          name="email" 
          className="form-error" 
          />
          </div>
         <div className="login-form-group">
          <Field name="password" className="form-field" placeHolder="Digite sua senha" />
          <ErrorMessage 
          component="span" 
          name="password" 
          className="form-error" 
          />
          </div>
          
          <div className="login-form-group">
          <Field name="confirmPassword" className="form-field" placeHolder="Confirme sua senha" />
          <ErrorMessage 
          component="span" 
          name="confirmPassword" 
          className="form-error" 
          />
          </div>
        
         </div>
          <button className="button" type="submit">
          Foto de perfil .jpg ou .png
          </button>

          <button className="button" type="submit">
            Cadastrar
          </button>
          

         </form>
    </Formik>
  </div>
  );
}

export default App;
