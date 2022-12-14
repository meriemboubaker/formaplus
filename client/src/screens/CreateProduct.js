import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    updateProduct,
   fetchProduct
} from "../redux/productSlice";
import {useParams} from 'react-router-dom'
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
const CreateProduct = () => {
    const productState = useSelector((state) => state.product);
    const {
        product,
        loading, errors

    } = productState;
    const [selectedImage, setSelectedImage] = useState();
    const [productlist , setproductlist] = useState({})
    const [success , setSuccess] = useState(false)
 const param = useParams()
 const id = param.id
console.log(id)
    const dispatch = useDispatch();


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
        setproductlist({ ...productlist, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({id:id, data:productlist, file: selectedImage })
        ).then(()=>{
            setSuccess(true)
        });
    };
useEffect(()=>{
    dispatch(fetchProduct(id))
},[])
    return (

        <form className="container" onSubmit={(e)=>handleSubmit(e)}>
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
                {selectedImage ? (
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
                ):
                product?.image?(<div style={styles.preview}>
                <img
                    src={product?.image?.slice(6)}
                    style={styles.image}
                    alt="Thumb"
                />

                <button onClick={removeSelectedImage} style={styles.delete}>
                    {/*   <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
            </div>):null}
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
                    value={product?.name}
                />
            </div>

        

            <div className="mb-1 d-flex flex-column justify-content-left">
                <label
                    for="exampleFormControlInput1"
                    className="modal-label text-start"
                >
                    quantit??{" "}
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="quantity"
                    name="quantity"
                    required
                    onChange={(e) => handleChange(e)}
                    value={product?.quantity}
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
                    product Cr???? avec succ??s !
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                
            >
                Save changes
            </button>
        </form>
    )
}
export default CreateProduct