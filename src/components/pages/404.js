import ErrorMessage from "../errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Page404= () => {
    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/'); // если нет истории
        }
    }

    return (
        <div style={{textAlign: 'center'}}>
            <ErrorMessage/>
            <p style={{fontWeight: 'bold', fontSize: '1.8em', lineHeight: '2em', margin: '20px auto'}}>Page doesn't exist</p>
            <button onClick={()=> goBack()} style={{color: 'rgb(57, 66, 205)', padding: '8px 15px', backgroundColor: 'white', borderColor: '#eee'}}>Back to the main page</button>
        </div>
    )
}



export default Page404