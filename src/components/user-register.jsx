import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function UserRegister() {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user) => {
            axios.post(`https://video-library-project.onrender.com/register-user`, user)
                .then(() => {
                    alert('User Registered');
                    navigate('/user-login');
                });
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={formik.handleSubmit}>
                <h3>Register User</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
            </form>
        </div>
    );
}
