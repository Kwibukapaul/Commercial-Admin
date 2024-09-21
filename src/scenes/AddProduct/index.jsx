import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast } from "react-toastify";

const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [categories, setCategories] = useState([]);

  // Simulated API call to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      // Simulating an API response
      const response = [
        "Meals",
        "Furniture",
        "Electronics",
        "Clothing",
        "Toys",
        "Books",
        "Beauty Products",
        "Sports Equipment",
        "Jewelry",
        "Gardening Tools",
      ];
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      toast.success("Product added successfully!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      toast.error("Failed to add product: " + error.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="Add New Product" />
      <Formik
        initialValues={initialProductValues}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
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
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
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
                label="Market"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.market}
                name="market"
                error={!!touched.market && !!errors.market}
                helperText={touched.market && errors.market}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="category"
                  error={!!touched.category && !!errors.category}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

// Validation schema for products
const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup.number().required("Price is required"),
  market: yup.string().required("Market is required"),
  category: yup.string().required("Category is required"),
});

// Initial product form values
const initialProductValues = {
  name: "",
  price: "",
  market: "",
  category: "",
};

export default AddProduct;
