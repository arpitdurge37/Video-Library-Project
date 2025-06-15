import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Signout() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin-id']); // ✅ square brackets me rakho
    let navigate = useNavigate();

    function handleSignoutClick() {
        removeCookie('admin-id');
        navigate('/');
        window.location.reload();
    }

    return (
        <button onClick={handleSignoutClick} className='btn btn-danger'>
            {cookies['admin-id']} - Signout
        </button>
    );
}
