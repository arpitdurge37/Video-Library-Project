// admin-delete-video.jsx

import axios from "../axiosConfig"; // ✅ using custom axios config
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteVideo() {
    let params = useParams();
    let navigate = useNavigate();
    const [videos, setVideos] = useState([{
        VideoId: 0, Title: '', Url: '', Description: '',
        Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0
    }]);

    useEffect(() => {
        axios.get(`/get-video/${params.id}`) // ✅ updated URL
            .then(response => {
                setVideos([response.data]); // ✅ wrap single object into array
            });
    }, []);

    function handleYesClick() {
        axios.delete(`/delete-video/${params.id}`) // ✅ updated URL
            .then(() => {
                navigate("/admin-dashboard");
            });
    }

    return (
        <div>
            <h3>Delete Video</h3>
            <p>Are you sure? Want to Delete?</p>
            <div className="card">
                <div className="card-header">
                    <iframe src={videos[0].Url} width="100%" title={videos[0].Title}></iframe>
                </div>
                <div className="card-body">
                    {videos[0].Title}
                </div>
                <div className="card-footer">
                    <button onClick={handleYesClick} className="btn btn-success me-2">Yes</button>
                    <Link className="btn btn-danger" to="/admin-dashboard">No</Link>
                </div>
            </div>
        </div>
    );
}
