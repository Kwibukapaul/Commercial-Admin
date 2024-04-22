import { Box, Button, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import ImageIcon from '@mui/icons-material/Image';
import { useState } from "react";
import PermMediaIcon from '@mui/icons-material/PermMedia';

const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [image, setImage]=useState(false);
  const imageHandler=(e)=>{
    setImage(e.target.files[0]);
  }
  return (
    <Box m="20px">
      <Header title="Adding New Products" />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productTitle}
                name="productTitle"
                error={!!touched.productTitle && !!errors.productTitle}
                helperText={touched.productTitle && errors.productTitle}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Offer Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerPrice}
                name="offerPrice"
                error={!!touched.offerPrice && !!errors.offerPrice}
                helperText={touched.offerPrice && errors.offerPrice}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel>Product Category</InputLabel>
                <Select
                  value={values.productCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="productCategory"
                  error={!!touched.productCategory && !!errors.productCategory}
                >
                  <MenuItem value="electronics"><ImageIcon /> Electronics</MenuItem>
                  <MenuItem value="clothing"><ImageIcon /> Clothing</MenuItem>
                  <MenuItem value="furniture"><ImageIcon /> Furniture</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ gridColumn: "span 4" }}>
             {/* <MuiFileInput
             value={image ? URL.createObjectURL(image): PermMediaIcon}
             onChange={imageHandler}
             /> */}
             <FormLabel htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image): PermMediaIcon} alt=""/>
             </FormLabel>
             <Input
              onChange={imageHandler}
              type="file"
              name="image"
              id="image" />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
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
  productTitle: yup.string().required("Required"),
  price: yup.number().required("Required"),
  offerPrice: yup.number().required("Required"),
  productCategory: yup.string().required("Required"),
});

const initialValues = {
  productTitle: "",
  price: "",
  offerPrice: "",
  productCategory: "",
};

export default AddProduct;
