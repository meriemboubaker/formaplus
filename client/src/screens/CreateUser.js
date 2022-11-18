import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    postNewUser

} from "../redux/userSlice";

const styles = {
    container: {
        display: "flex",
        maxWidth: "19rem",
        maxHeight: "190px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px auto",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
    },
    preview: {
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "19rem", maxHeight: "150px" },
    delete: {
        cursor: "pointer",
        border: "1px gray solid",
        height: "40px",
        width: "100%",
    },
};
const CreateUser = () => {

    const [selectedImage, setSelectedImage] = useState();
    const [userInfo , setUserInfo] = useState({})


    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const {
        user,
        loading, errors

    } = userState;
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
       e.preventDefault()
        dispatch(
            postNewUser({ userInfo, file: selectedImage })
        );
    };

    return (

        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div style={styles.container}>
                {!selectedImage && (
                    <div className="upload_image mt-4 mb-4 mx-auto">
                        <span>Upload Image</span>
                        <input
                            accept="image/*"
                            type="file"
                            className="photo-input"
                            onChange={imageChange}
                        />
                    </div>
                )}
                {selectedImage && (
                    <div style={styles.preview}>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            style={styles.image}
                            alt="Thumb"
                        />

                        <button onClick={removeSelectedImage} style={styles.delete}>
                            {/*   <FontAwesomeIcon icon={faTrashAlt} /> */}
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-1 d-flex flex-column justify-content-left">
                <label
                    for="exampleFormControlInput1"
                    className="modal-label text-start"
                >
                    Nom{" "}
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
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
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="email"
                    name="email"
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
            {user && (
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