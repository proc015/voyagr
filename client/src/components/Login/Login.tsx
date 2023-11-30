

const Login = () => {
  
const handleSubmit = () => {

}

const handleChange = () => {

}
    
  
return (
    <section>
        <h3>Login</h3>
        <form className="login-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="insert email..."
                name="email"
                value={}
                onChange={handleChange}
            />
            <input 
                type="password"
                placeholder="type password..."
                name="password"
                value={}
                onChange={handleChange}
            />
            <button className="form-submit" type="submit"/>
        </form>
    </section>
  )
}

export default Login
