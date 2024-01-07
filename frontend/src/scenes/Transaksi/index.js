import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TransactionService from '../../services/TransactionService';

const Transaksi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]); // State to hold the data

  const columns = [
    //{ field: 'id', headerName: 'ID' },
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
    // Add more columns as needed
  ];

  useEffect(() => {
    // Fetch data using the service when the component mounts
    TransactionService.getTransactions()
      .then((response) => {
        // Assuming your API response has a property called 'data' containing the array of transactions
        const transactions = response.data;
        setRows(transactions);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <Box m="20px">
      <Header title="Daftar Transaksi" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transaksi;
