import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";

const ListUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  // Fetch users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        // Map data to include an id field for the DataGrid
        const formattedData = data.map((user) => ({
          id: user._id, // Use _id as id
          name: user.name,
          email: user.email,
        }));

        setUsers(formattedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Remove user function
  const removeUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Ensure to use 'id' instead of '_id' here
      } else {
        console.error("Failed to remove user:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 150 }, // Increased width for ID
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      width: 100, // Set width for remove column
      renderCell: (params) => (
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
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none", color: colors.grey[100] },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          getRowId={(row) => row.id} // Specify id field
        />
      </Box>
    </Box>
  );
};

export default ListUsers;
