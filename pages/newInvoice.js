import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import submitInvoice from './writeNewInvoice';

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

export default function NewInvoice() {

    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientDataSubmitted, setClientDataSubmitted] = useState(false);
    const [detailsCount, setDetailsCount] = useState(0);
    const [details, setDetails] = useState([]);

    function handleFirstNameChange(event) {
        setClientFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setClientLastName(event.target.value);
    }

    function handleEmailChange(event) {
        setClientEmail(event.target.value);
    }

    function handleClientSubmit(event) {
        event.preventDefault();
        setClientDataSubmitted(true);
    }

    function handleDetailsSubmit(event) {
        event.preventDefault();

        setDetails([...details, {
            "key": detailsCount,
            "description": event.target.description.value,
            "price": event.target.price.value,
            "quantity": event.target.quantity.value,
            "isDeleted": false
        }]);

        console.log(details);
        setDetailsCount(detailsCount + 1);
    }

    function removeFromDetails(event) {
        event.preventDefault(); 

        const detailsIndex = details.findIndex(x => event.target.value == x.key);

        const detailsUpdate = [...details];

        detailsUpdate[detailsIndex].isDeleted = true;

        setDetails(detailsUpdate);

        console.log(details);

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>New Invoice</title>
            </Head>
            <main>
                <h1 className={styles.title} >
                    New Invoice:
                </h1>
                
                <div className={styles.inputGrid}>
                    <h2>Input Client:</h2>
                    <div className={styles.inputClient}>
                        <form className={styles.clientForm}>
                            <label htmlFor="first">First Name</label>
                            <input type="text" id="first" name="first" required onChange={handleFirstNameChange} />
                            <label htmlFor="last">Last Name</label>
                            <input type="text" id="last" name="last" required onChange={handleLastNameChange} />
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" required onChange={handleEmailChange} />

                            <button type="submit" onClick={handleClientSubmit}>Submit</button>
                        </form>
                    
                        <div className={styles.clientDisplay}>
                            <h3>Client:</h3>
                            <div className={styles.name}>
                                {clientFirstName} {clientLastName}
                            </div>
                            <div className={styles.email}>
                                {clientEmail}
                            </div>
                        </div>
                    </div>

                    <h3>Input Details:</h3>
                    {clientDataSubmitted ? 
                        <div className={styles.inputDetails}>
                            <form className={styles.detailsForm} onSubmit={handleDetailsSubmit}>
                                <label htmlFor="first">Description</label>
                                <input type="text" id="description" name="description" required/>
                                <label htmlFor="last">Price</label>
                                <input type="number" id="price" name="price" required />
                                <label htmlFor="email">Quantity</label>
                                <input type="number" id="quantity" name="quantity" required />

                                <button type="submit" >Submit</button>
                            </form>

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
                                        {details.map(value =>
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
                        </div>

                        :

                        <div className={styles.inputDetails}>
                            <i >Enter client data first</i>
                        </div>
                    }
                    
                    
                </div>
            </main>

            <footer className={styles.myFooter}>
                <Link href="/">
                    <div className={styles.backToHome}>
                        <button>
                            <span>Back to home</span>
                        </button>
                    </div>
                </Link>
                <div className={styles.submitInvoice}>
                    <button onClick={submitInvoice(
                        clientFirstName,
                        clientLastName,
                        clientEmail,
                        details
                    )}>
                        <span>Submit invoice</span>
                    </button>
                </div>
            </footer>
        </div>
    )
}

function detailsReducer(state, action) {

    // get the movie object and the type of action by destructuring
    const { details, type } = action

    // if "add"
    // return an array of the previous state and the movie object
    if (type === "add") return [...state, details]

    // if "remove"
    // remove the movie object in the previous state
    // that matches the title of the current movie object
    if (type === "remove") {
        const detailIndex = state.findIndex(x => x.key === details.key)

        // if no match, return the previous state
        if (detailIndex < 0) return state

        // avoid mutating the original state, create a copy
        const stateUpdate = [...state]

        // then splice it out from the array
        stateUpdate.splice(detailIndex, 1)
        return stateUpdate
    }
    return state
}