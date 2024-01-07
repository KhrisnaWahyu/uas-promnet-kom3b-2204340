package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/api/reports",
		GetTransactions).Methods("GET")
	router.HandleFunc("/api/reports",
		CreateTransaction).Methods("POST")
	router.HandleFunc("/api/reports/{id}",
		GetTransaction).Methods("GET")
	router.HandleFunc("/api/reports/{id}",
		UpdateTransaction).Methods("PUT")
	router.HandleFunc("/api/reports/{id}",
		DeleteTransaction).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all transactions
func GetTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var transactions []Transaction

	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address FROM transaksi_keuangan_khrisna")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var transaction Transaction
		err := result.Scan(&transaction.ID, &transaction.Date, &transaction.Description, &transaction.Amount, &transaction.Status, &transaction.Receiver, &transaction.JK, &transaction.NoTelp, &transaction.Address)
		if err != nil {
			panic(err.Error())
		}
		transactions = append(transactions, transaction)
	}
	json.NewEncoder(w).Encode(transactions)
}

// Create transaction
func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO transaksi_keuangan_khrisna(date, description, amount, status, receiver, jk, no_telp, address) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var transaction Transaction
	json.Unmarshal(body, &transaction)
	_, err = stmt.Exec(transaction.Date, transaction.Description, transaction.Amount, transaction.Status, transaction.Receiver, transaction.JK, transaction.NoTelp, transaction.Address)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New transaction was created")
}

// Get transaction by ID
func GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address FROM transaksi_keuangan_khrisna WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var transaction Transaction
	for result.Next() {
		err := result.Scan(&transaction.ID, &transaction.Date, &transaction.Description, &transaction.Amount, &transaction.Status, &transaction.Receiver, &transaction.JK, &transaction.NoTelp, &transaction.Address)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(transaction)
}

// Update transaction
func UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE transaksi_keuangan_khrisna SET date=?, description=?, amount=?, status=?, receiver=?, jk=?, no_telp=?, address=? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var transaction Transaction
	err = json.Unmarshal(body, &transaction)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(transaction.Date, transaction.Description, transaction.Amount, transaction.Status, transaction.Receiver, transaction.JK, transaction.NoTelp, transaction.Address, params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Transaction with ID = %s was updated", params["id"])
}

// Delete transaction
func DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM transaksi_keuangan_khrisna WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Transaction with ID = %s was deleted", params["id"])
}

type Transaction struct {
	ID          string `json:"id"`
	Date        string `json:"date"`
	Description string `json:"description"`
	Amount      int64  `json:"amount"`
	Status      string `json:"status"`
	Receiver    string `json:"receiver"`
	JK          string `json:"jk"`
	NoTelp      string `json:"no_telp"`
	Address     string `json:"address"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2204340_Khrisna_Wahyu_Wibisono_uas_pilkomB")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
