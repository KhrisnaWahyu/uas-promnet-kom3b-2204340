import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TransactionService from '../../services/TransactionService';

const EditTransaksi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editedTransaction, setEditedTransaction] = useState({
    id: '',
    date: '',
    description: '',
    amount: '',
    status: '',
    receiver: '',
    jk: '',
    no_telp: '',
    address: '',
  });

  const columns = [
    {
        field: "date",
        headerName: "DATE",
        flex: 1,
        cellClassName: "date-column--cell",
      },
      {
          field: "description",
          headerName: "DESCRIPTION",
          flex: 1,
          cellClassName: "description-column--cell",
        },
        {
          field: "amount",
          headerName: "AMOUNT",
          flex: 1,
          cellClassName: "amount-column--cell",
        },{
          field: "status",
          headerName: "STATUS",
          flex: 1,
          cellClassName: "status-column--cell",
        },{
          field: "receiver",
          headerName: "RECEIVER",
          flex: 1,
          cellClassName: "receiver-column--cell",
        },{
          field: "jk",
          headerName: "JENIS KELAMIN",
          flex: 1,
          cellClassName: "jk-column--cell",
        },
        {
          field: "no_telp",
          headerName: "NO_TELP",
          flex: 1,
          cellClassName: "no_telp-column--cell",
        },
        {
          field: "address",
          headerName: "ADDRESS",
          flex: 1,
          cellClassName: "address-column--cell",
        },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => openEditDialog(row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data using the service when the component mounts
    TransactionService.getTransactions()
      .then((response) => {
        const transactions = response.data;
        setRows(transactions);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const openEditDialog = (transaction) => {
    setEditedTransaction(transaction);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditedTransaction({
      id: '',
      date: '',
      description: '',
      amount: '',
      status: '',
      receiver: '',
      jk: '',
      no_telp: '',
      address: '',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditSave = () => {
    TransactionService.updateTransaction(editedTransaction, editedTransaction.id)
      .then(() => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === editedTransaction.id ? editedTransaction : row
          )
        );
        setSuccessMessage('Data successfully edited!');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error(`Error updating transaction with ID ${editedTransaction.id}:`, error);
      })
      .finally(() => {
        closeEditDialog();
      });
  };

  return (
    <Box m="20px">
      <Header title="EDIT TRANSACTION" subtitle="Edit Transaction Details Data" />
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
          rows={rows}
          columns={columns}
          selectionModel={selectedRows.map((row) => row.id)}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(
              newSelection.map((selectedId) => rows.find((row) => row.id === selectedId))
            );
          }}
        />
        <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogContent>
            {/* Add TextField or other input components for editing transaction fields */}
            <TextField
              label="Date"
              value={editedTransaction.date}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, date: e.target.value })
              }
            />
            <TextField
              label="Description"
              value={editedTransaction.description}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, description: e.target.value })
              }
            />
            <TextField
              label="Amount"
              value={editedTransaction.amount}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, amount: e.target.value })
              }
            />
            <TextField
              label="Status"
              value={editedTransaction.status}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, status: e.target.value })
              }
            />
            <TextField
              label="Jenis Kelamin"
              value={editedTransaction.jk}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, jk: e.target.value })
              }
            />
            <TextField
              label="No_Telp"
              value={editedTransaction.no_telp}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, no_telp: e.target.value })
              }
            />
            <TextField
              label="Address"
              value={editedTransaction.address}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction, address: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </Box>
  );
};

export default EditTransaksi;
