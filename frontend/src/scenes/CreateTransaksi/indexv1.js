import React from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import TransactionService from "../../services/TransactionService";

const CreateTransaksi = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(null);

  const handleOpenConfirmationDialog = (values) => {
    setFormValues(values);
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmCreate = async (values) => {
    try {
      await TransactionService.createTransaction(values);
      handleCloseConfirmationDialog();
      console.log('Transaction created successfully:', values);
      // Add any additional logic or redirection here upon successful creation
    } catch (error) {
      console.error('Error creating transaction:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted with values:', values);
    handleOpenConfirmationDialog(values);
  };

  const checkoutSchema = yup.object().shape({
    date: yup.string().required("required"),
    description: yup.string().required("required"),
    amount: yup.string().required("required"),
    status: yup.string().required("required"),
    receiver: yup.string().required("required"),
    jk: yup.string().required("required"),
    no_telp: yup.string().required("required"),
    address: yup.string().required("required"),
  });

  const initialValues = {
    date: '',
    description: '',
    amount: '',
    status: '',
    receiver: '',
    jk: '',
    no_telp: '',
    address: '',
  };

  return (
    <Box m="20px">
      <Header title="CREATE TRANSACTION" subtitle="Create a New Transaction" />

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
          <form onSubmit={(e) => { console.log('Formik handleSubmit called'); handleSubmit(e); }}>
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
                label="Transaction Date (YYYY-MM-DD)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Receiver Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.receiver}
                name="receiver"
                error={!!touched.receiver && !!errors.receiver}
                helperText={touched.receiver && errors.receiver}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="No_Telp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no_telp}
                name="no_telp"
                error={!!touched.no_telp && !!errors.no_telp}
                helperText={touched.no_telp && errors.no_telp}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Jenis Kelamin (L/P)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jk}
                name="jk"
                error={!!touched.jk && !!errors.jk}
                helperText={touched.jk && errors.jk}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status (Debit/Kredit)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="button" onClick={() => handleOpenConfirmationDialog(values)} color="secondary" variant="contained">
              Create New Transaction
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to create a new transaction with the provided details?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmCreate(formValues)} color="secondary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateTransaksi;
