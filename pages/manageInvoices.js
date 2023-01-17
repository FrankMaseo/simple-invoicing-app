import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import Modal from './invoiceModal';

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyDamm1Jk32aHjLWBFT8i8AZT8AWPcWgmao",
    authDomain: "outvoice-33a12.firebaseapp.com",
    projectId: "outvoice-33a12",
    storageBucket: "outvoice-33a12.appspot.com",
    messagingSenderId: "265279482415",
    appId: "1:265279482415:web:7afb443e35bbe2320ef4da",
    measurementId: "G-5W9GQ693G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/

const d1 = new Date("2022-12-01")
const invoicesTest = [
    {
        invoiceId: "A1",
        invoiceDate: "2022-12-01",
        clientFirstName: "Florent",
        clientLastName: "Dubois",
        clientEmail: "florentdubois@live.fr",
        details: [
            {
                "key": 0,
                "description": "Consultation de Naturopathie",
                "price": 55,
                "quantity": 2
            },
            {
                "key": 2,
                "description": "Reflexologie plantaire",
                "price": 75,
                "quantity": 1
            }
        ]
    },
    {
        invoiceId: "A2",
        invoiceDate: "2022-12-10",
        clientFirstName: "Leo",
        clientLastName: "Dubois",
        clientEmail: "leodubois@live.fr",
        details: [
            {
                "key": 0,
                "description": "Consultation de Naturopathie",
                "price": 55,
                "quantity": 1
            },
            {
                "key": 2,
                "description": "Iridologie",
                "price": 35,
                "quantity": 3
            }
        ]
    },

]



export default function ManageInvoices() {

    const [dateFrom, setDateFrom] = useState(Date("2022-01-01"));
    const [dateTo, setDateTo] = useState(Date.now());

    function handleChangeDateFrom(event) {
        setDateFrom(event.target.value);
    }
    function handleChangeDateTo(event) {
        setDateTo(event.target.value);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Manage Invoices</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main>
                <h1 className={styles.title} >
                    Manage Invoices
                </h1>
                <Link href="/">
                    Back to Home
                </Link>

                <form className={styles.invoiceDateRange }>
                    <label>
                        Select Date range
                    </label>
                    <div>
                        <input type="date" id="dateFrom" name="dateFrom" onChange={handleChangeDateFrom}></input>
                        <span>&rarr;</span>
                        <input type="date" id="dateTo" name="dateTo" onChange={handleChangeDateTo}></input>
                    </div>
                </form>

                <ShowInvoices dateFrom={dateFrom} dateTo={dateTo} />

            </main>

        </div>
    );

}


function ShowInvoices(dateFrom, dateTo) {
    const invoices = getServerData(dateFrom, dateTo); 

    return (
        <div className={styles.invoiceMgmtDisplay}>

            <div className={styles.invoiceMgmtSumUp}>
                <span>
                    Number of invoices: {invoices.length}
                </span>
                <span>
                    Total amount invoiced: {getTotalAmount(invoices)}&euro;
                </span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Invoice No</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(value => invoiceMgmtLine(value) )}
                </tbody>
            </table>
        </div>
    );
}

function invoiceMgmtLine(invoice) {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <tr className={styles.detailsRow} key={invoice.invoiceId} onClick={toggle}>
            <td>{invoice.invoiceId}</td>
            <td>{invoice.invoiceDate}</td>
            <td>{invoice.clientLastName} {invoice.clientFirstName}</td>
            <td>
                {invoice.details.reduce(
                    (previousValue, currentValue) => (previousValue.price * previousValue.quantity) + (currentValue.price * currentValue.quantity)
                )}
            </td>
            <Modal displayModal={isOpen} closeModal={toggle} invoice={invoice} />
        </tr>
    );
}


/*<tr className={styles.detailsRow} key={value.invoiceId}>
                        <td>{value.invoiceId}</td>
                        <td>{value.invoiceDate}</td>
                        <td>{value.clientLastName} {value.clientFirstName}</td>
                        <td>{value.details.reduce(
                            (previousValue, currentValue) => (previousValue.price * previousValue.quantity) + (currentValue.price * currentValue.quantity)
                        )}</td>
                    </tr>*/

function getServerData(dateFrom, dateTo) {
    return invoicesTest;
}


function getTotalAmount(invoices) {
    let totalAmount = 0;
    for (const invoice of invoices) {
        for (const detail of invoice.details) {
            totalAmount += detail.price * detail.quantity;
        }
    }
    return totalAmount;
}
