// admin-dashboard.jsx

import axios from "../axiosConfig"; // ✅ custom axios config
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminDashBoard() {
    const [videos, setVideos] = useState([]);

    function LoadVideos() {
        axios.get("/get-videos")
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("Error loading videos:", error);
                alert("Failed to load videos. Please check your backend server.");
            });
    }

    useEffect(() => {
        LoadVideos();
    }, []);

    return (
        <div>
            <h5 className="text-center">Admin Dash Board</h5>
            <Link to="/add-video" className="bi bi-camera-video-fill btn btn-light"> Add New</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.length > 0 ? (
                            videos.map(video =>
                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe
                                            width="400"
                                            height="100"
                                            src={video.Url}
                                            title={video.Title}
                                            allowFullScreen>
                                        </iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen btn btn-warning"></Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className="bi ms-2 bi-trash-fill btn btn-danger"></Link>
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-muted">No videos found.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
