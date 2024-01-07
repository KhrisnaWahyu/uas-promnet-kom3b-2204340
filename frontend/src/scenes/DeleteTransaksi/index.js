import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TransactionService from '../../services/TransactionService';

const DeleteTransaksi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

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
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openConfirmationDialog(row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    TransactionService.getTransactions()
      .then((response) => {
        const transactions = response.data;
        setRows(transactions);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const openConfirmationDialog = (transaction) => {
    setTransactionToDelete(transaction);
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleDelete = () => {
    if (transactionToDelete) {
      TransactionService.deleteTransaction(transactionToDelete.id)
        .then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== transactionToDelete.id));
          setSnackbarOpen(true); // Show success notification
        })
        .catch((error) => {
          console.error(`Error deleting transaction with ID ${transactionToDelete.id}:`, error);
        })
        .finally(() => {
          closeConfirmationDialog();
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="DELETE TRANSACTION" subtitle="Delete with Precaution" />
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
        <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the transaction?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmationDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Data successfully deleted!"
      />
    </Box>
  );
};

export default DeleteTransaksi;
