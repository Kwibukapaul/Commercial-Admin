import { Box, Typography, useTheme,IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState,useEffect  } from "react";

const Team = () => {
  const [allUserz, setAllUserz]=useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchUserz=async()=>{
    await fetch("http://localhost:5000/alluserz")
    .then((res) => res.json())
    .then((data) => {
      setAllUserz(data);
    });
  }
  useEffect(()=>{
    fetchUserz();
  },[])

  const remove_user = async (id) => {
    await axios.post("http://localhost:5000/removeuser", {id: id });
    setAllUserz(prevUser => prevUser.filter((user) => user.id != id));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => remove_user(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },

  ];
 
  const dataTeam = allUserz.map((user, index) => ({
    id: user.id || index,
    name: user.name,
    email: user.email,
    password: user.password,
    age: user.age,
    phone: user.phone,
    access: user.access,
  }));
console.log(dataTeam)
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
             <DataGrid
          checkboxSelection
          rows={dataTeam}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default Team;
