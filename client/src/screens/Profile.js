import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate}from 'react-router-dom'
import {
    updateUser,
    getUser

} from "../redux/userSlice";

const CreateUser = () => {



    const dispatch = useDispatch();
    const {user,loading, errors} = useSelector((state) => state.user);

    const [userInfo , setUserInfo] = useState(user)
    const [name , setName] = useState(user.name)
    const [email , setEmail] = useState(user.email)
    const [password , setPassword] = useState()
    const [oldpassword , setoldPassword] = useState()
    const [showSuccess,setShowSuccess] = useState(false)
 
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
       e.preventDefault()
        dispatch(
            updateUser({ data:userInfo,id:user._id})
        ).then(()=>{
            getUser(user?._id)
            setShowSuccess(true)
        });
    };

    return (

        <form className="container  mt-5"  onSubmit={(e)=>handleSubmit(e)}>
    
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
                    value={name}
                    onChange={(e) => 
                       { setName(e.target.value)
                        handleChange(e)}}
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
                    value={email}
                    id="exampleFormControlInput1"
                    placeholder="email"
                    name="email"
                    required
                    onChange={(e) => 
                        {setEmail(e.target.value)
                        handleChange(e)}}
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
                    name="oldpassword"
                    value={oldpassword}
                    required
                    onChange={(e) => {
                        setoldPassword(e.target.value)
                        handleChange(e)}}
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
                    value={password}
                    name="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value)
                        handleChange(e)}}
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
            {showSuccess && (
                <div className="alert alert-success" role="alert">
                    product Créé avec succés !
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Save changes
            </button>
        </form>
    )
}
export default CreateUser