import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminDashBoard() {

    const [videos, setVideos] = useState([
        { VideoId: 0, Title: '', Url: '', Description: '', Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 }
    ]);

    function LoadVideos() {
        axios.get('https://video-library-project.onrender.com/get-videos')
            .then(response => {
                setVideos(response.data);
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
                        videos.map(video =>
                            <tr key={video.VideoId}>
                                <td>{video.Title}</td>
                                <td>
                                    <iframe width="400" height="100" src={video.Url} title={video.Title}></iframe>
                                </td>
                                <td>
                                    <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen btn btn-warning"></Link>
                                    <Link to={`/delete-video/${video.VideoId}`} className="bi ms-2 bi-trash-fill btn btn-danger"></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
