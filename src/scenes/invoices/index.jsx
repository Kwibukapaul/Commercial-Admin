import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        // Map data to include an id field for the DataGrid
        const formattedData = data.map((product) => ({
          id: product._id, // Use _id as id
          name: product.name,
          market: product.market,
          price: product.price,
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Remove product function
  const removeProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        console.error("Failed to remove product:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  // Columns for the product table
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "market", headerName: "Marketplace", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>${params.row.price}</Typography>
      ),
    },
    {
      field: "remove",
      headerName: "Remove",
      width: 100, // Set width for remove column
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => removeProduct(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Market Products" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={products}
          columns={columns}
          getRowId={(row) => row.id} // Specify id field
        />
      </Box>
    </Box>
  );
};

export default Products;
