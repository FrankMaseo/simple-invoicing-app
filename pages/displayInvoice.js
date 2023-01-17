import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


/*
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

*/

export default function DisplayInvoice(invoice) {
    return (


        <div className={styles.detailsDisplay}>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.details.map(value =>
                        value.isDeleted ?
                            <span key={value.key}></span>
                            :
                            <tr className={styles.detailsRow} key={value.key}>
                                <td>{value.key}</td>
                                <td>{value.description}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <td>{value.quantity * value.price}</td>
                                <td><button value={value.key} onClick={removeFromDetails}>Remove</button></td>
                            </tr>

                    )}
                </tbody>
            </table>
        </div>
    );
    
}