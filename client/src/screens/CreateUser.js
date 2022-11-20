import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate}from 'react-router-dom'
import {
    postNewUser

} from "../redux/userSlice";

const CreateUser = () => {

    const [userInfo , setUserInfo] = useState({})
    const [success,setSucess] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const {
        user,
        loading, errors

    } = userState;
 
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
       e.preventDefault()
        dispatch(
            postNewUser({ userInfo})
        ).then(()=>{
            setSucess(true)
            navigate("/login")
        });
    };

    return (

        <form className="container" onSubmit={(e)=>handleSubmit(e)}>
    
            <div className="mb-1 d-flex flex-column justify-content-left">
                <label
                    for="exampleFormControlInput0"
                    className="modal-label text-start"
                >
                    Nom{" "}
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput0"
                    placeholder="Nom"
                    name="name"
                    required
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div className="mb-1 d-flex flex-column justify-content-left">
                <label
                    for="exampleFormControlInput1"
                    className="modal-label text-start"
                >
                    email{" "}
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="email"
                    name="email"
                    required
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="mb-1 d-flex flex-column justify-content-left">
                <label
                    for="exampleFormControlInput2"
                    className="modal-label text-start"
                >
                    mot de passe{" "}
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="password"
                    name="password"
                    required
                    onChange={(e) => handleChange(e)}
                />
            </div>

       

            {loading && (
                <div className="w-100 mt-2 d-flex justify-content-center">
                    <div className="spinner-border mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {errors && (
                <div className="alert alert-danger" role="alert">
                    {errors}
                </div>
            )}
            {success && (
                <div className="alert alert-success" role="alert">
                    product Créé avec succés !
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create User
            </button>
        </form>
    )
}
export default CreateUser