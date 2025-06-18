import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RegisterLink() {
    return (
        <Link to='/register-user' className="btn btn-warning mt-2">Register</Link>
    );
}

export function VideoLibraryHome() {
    const [view, setView] = useState('');

    const formik = useFormik({
        initialValues: { UserId: '', UserName: '', Password: '', Email: '', Mobile: '' },
        onSubmit: (user) => {
            axios.get(`https://video-library-project.onrender.com/get-users`)
                .then(response => {
                    const data = response.data.find(client => client.Email === user.Email);
                    if (!data) {
                        // Show register link ONLY if email not found
                        setView(<RegisterLink />);
                    } else {
                        // Email found, don't show anything
                        setView('');
                    }
                });
        }
    });

    return (
        <div style={{ height: '65vh' }} className="d-flex justify-content-center align-items-center">
            <main className='text-center'>
                <h1>Watch Technology Videos</h1>
                <p>Any where any time</p>
                <div className="input-group">
                    <form onSubmit={formik.handleSubmit} className="input-group">
                        <input
                            type="email"
                            onChange={formik.handleChange}
                            name="Email"
                            className="form-control"
                            placeholder="Your email address"
                        />
                        <button type="submit" className="btn btn-danger">
                            Get Started <span className="bi bi-chevron-right"></span>
                        </button>
                    </form>
                </div>
                <div className="my-3">
                    {view}
                </div>
            </main>
        </div>
    );
}
