import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    prodName: "",
    prodImage: "",
    prodCategory: "women",
    new_price: "",
    old_price: "",
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  const Add_Product = async() => {
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);

    await fetch('http://localhost:5000/upload',{
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.prodImage=responseData.image_url;
      console.log(product);
      await fetch('http://localhost:5000/addproduct',{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      }).then((res)=>res.json()).then((data)=>{
        data.success ?  toast.success("Success Notification !", {
          position: "top-right"
        })
        : alert('Failed to Add Product')
      })
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title="Adding New Products" />
      <ToastContainer /> {/* Render ToastContainer here */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Rest of your form fields */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={Add_Product}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  prodName: yup.string().required("Required"),
  old_price: yup.number().required("Required"),
  new_price: yup.number().required("Required"),
  prodCategory: yup.string().required("Required"),
});

const initialValues = {
  prodName: "",
  old_price: "",
  new_price: "",
  prodCategory: "",
};

export default AddProduct;
