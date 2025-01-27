import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'


function LoginPage ({loginCheck , getProducts , base_url}){

    const [formData,setFormData] = useState({
        username:'',
        password:''
      })

    const handleInputChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
        ...formData,
        [name]:value
    })
    }  

    const handleSubmit = async (e)=>{
        e.preventDefault();
    
        if(!formData.username || !formData.password){
          alert('請輸入使用者信箱和密碼');
          return
        }
    
        try {
          const res = await axios.post(`${base_url}/admin/signin`,formData);
          const {token,expired} = res.data;
          document.cookie = `token=${token};expires=${new Date(expired)};`;
          axios.defaults.headers.common.Authorization = `${token}`;
          loginCheck();
          getProducts();
        } catch (error) {
          alert('登入失敗');
        }
    
      }

    return (
        <div className='container mb-3'>
            <h2>請登入</h2>
            <form className='form g-3' onSubmit={handleSubmit}>
                <div className="mb-3 row">
                <label htmlFor="username" className='col-form-label col-2 text-start'>使用者信箱{formData.username}</label>
                <input type="email" id='username' className='col-form-control col-10' name='username' onChange={handleInputChange} required />
                </div>
                <div className="mb-3 row">
                <label htmlFor="password" className='col-form-label col-2 text-start'>密碼</label>
                <input type="password" id='password' className='col-form-control col-10' name='password' onChange={handleInputChange} required />
                </div>
                <div className="mb-3 row">
                <button type='submit' className='btn btn-warning'>登入</button>
                </div>
            </form>
      </div>
    )
}

LoginPage.propTypes = {
    loginCheck: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    base_url: PropTypes.string.isRequired
};

export default LoginPage
