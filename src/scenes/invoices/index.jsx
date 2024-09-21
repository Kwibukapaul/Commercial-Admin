import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// Mock data for products
const mockDataProducts = [
  { id: 1, name: "Product A", marketplace: "Amazon", price: 100, stock: 50 },
  { id: 2, name: "Product B", marketplace: "eBay", price: 200, stock: 20 },
  { id: 3, name: "Product C", marketplace: "Etsy", price: 150, stock: 30 },
];

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Columns for the product table
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "marketplace", headerName: "Marketplace", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>${params.row.price}</Typography>
      ),
    },
    { field: "stock", headerName: "Stock", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Market Products" />

      {/* DataGrid to display products */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataProducts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Products;
