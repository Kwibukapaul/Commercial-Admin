import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";

const ListUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Default users array
  const [users, setUsers] = React.useState([
    { id: 1, name: "John Doe", email: "john@example.com", password: "12345" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", password: "abcde" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "alice123" },
  ]);

  // Remove user function
  const removeUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: (params: any) => (
        <IconButton aria-label="delete" onClick={() => removeUser(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="All Users List" />
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
            color: colors.grey[100],
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
        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default ListUsers;
