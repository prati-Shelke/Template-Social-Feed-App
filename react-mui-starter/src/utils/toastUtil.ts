import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTriangleExclamation,faCheck} from '@fortawesome/free-solid-svg-icons'
toast.configure()

export const Toast = {
    success : (msg:any) =>
    {
        toast.success(msg ,
            { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
    },
    error : (msg:any) =>
    {
        toast.error(msg ,
            { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
    },
    warn : (msg:any) =>
    {
        toast.warn(msg ,
            { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
    }
}

