import axiosInstance from "../axiosConfig"; // ✅ custom axios config use karo
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

export function UserLogin() {
    let navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies(['user-id']); // ✅ square brackets honi chahiye

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user) => {
            axiosInstance.get('/get-users') // ✅ use custom axios
                .then(response => {
                    const data = response.data.find(item => item.UserId === user.UserId);
                    if (data) {
                        if (data.Password === user.Password) {
                            setCookies('user-id', user.UserId);
                            navigate('/user-dashboard');
                        } else {
                            navigate('/user-error');
                        }
                    } else {
                        navigate('/user-error');
                    }
                });
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <div className="text-center bi bi-people-fill"> User Login</div>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
        </div>
    );
}
