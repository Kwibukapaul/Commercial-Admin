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

const AddUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Default array of users
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "12345" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", password: "abcde" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "alice123" },
  ];

  return (
    <Box m="20px">
      <Header title="User Information" />
      <Box>
        {users.map((user) => (
          <Box key={user.id} mb="20px" p="20px" border="1px solid #ccc" borderRadius="10px">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </Box>
        ))}
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values) => console.log(values)}
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
                label="User Name"
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
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel>User Role</InputLabel>
                <Select
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="role"
                  error={!!touched.role && !!errors.role}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
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

// Form validation schema
const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  role: yup.string().required("Required"),
});

// Initial form values
const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

export default AddUser;
