//Modal.js
import styles from '../styles/Modal.module.css'
import React from 'react';

const Modal = props => {
    const divStyle = {
        display: props.displayModal ? 'block' : 'none'
    };

    function closeModal(e) {
        e.stopPropagation()
        props.closeModal()
    }

    return (
        <div className={styles.modal} onClick={closeModal} style={divStyle}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()} >
                <span className={styles.closeButton} onClick={closeModal} >&times;</span>
                <div className={styles.modalInvoice}>
                    <h1 className={styles.modalInvoiceTitle}>Invoice n&deg;{props.invoice.invoiceId}</h1>
                    <div className={styles.modalInvoiceDate}>Date: {props.invoice.invoiceDate}</div>
                    <CompanyBlock invoice={props.invoice} />
                    <ClientBlock invoice={props.invoice} />
                </div>
                <DetailsBlock invoice={props.invoice} />
                <SubTotal invoice={props.invoice} />
            </div>
        </div>
    );
}


function ClientBlock(props) {
    return (
        <div className={styles.modalInvoiceClientDisplay}>
            <h3>Client:</h3>
            <div className={styles.name}>
                {props.invoice.clientFirstName} {props.invoice.clientLastName}
            </div>
            <div className={styles.email}>
                {props.invoice.clientEmail}
            </div>
        </div>
    );
}


const companyDetails = {
    entrepreneurName: "Dominique Dubois",
    companyName: "",
    companyAddress: {
        streetLine1: "46 rue des rivoirelles",
        streetLine2: "",
        zipCode: "69440",
        city: "Taluyers"
    },
    companyContact: {
        phoneNo1: "0674108991",
        email: "dominiqueduboisnaturopathe@gmail.com"
    },
    companyLegalCode: {
        type: "SIRET",
        code: "123456789"
    }
};

function CompanyBlock() {


    return (
        <div className={styles.modalCompanyDisplay}>
            <div><strong>{companyDetails.entrepreneurName} E.I.</strong></div>
            <div>{companyDetails.companyName}</div>
            <div>
                {companyDetails.companyAddress.streetLine1}
                {companyDetails.companyAddress.streetLine2}
                <br />
                {companyDetails.companyAddress.zipCode} {companyDetails.companyAddress.city}
            </div>

            <div>
                Email: {companyDetails.companyContact.email}
                <br />
                Tel.: {companyDetails.companyContact.phoneNo1}
            </div>

            <div>
                {companyDetails.companyLegalCode.type}: {companyDetails.companyLegalCode.code}
            </div>
        </div>
    );

}



function DetailsBlock(props) {
    return (
        <div className={styles.modalInvoiceDetails}>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.invoice.details.map(value =>
                        value.isDeleted ?
                            <span key={value.key}></span>
                            :
                            <tr className={styles.detailsRow} key={value.key}>
                                <td>{value.description}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <td>{value.quantity * value.price}</td>
                            </tr>

                    )}
                </tbody>
            </table>
        </div>
    );
}

function SubTotal(props) {
    return (
        <div className={styles.modalInvoiceSubtotal}>
            Subtotal: {
                props.invoice.details.reduce(
                    (previousValue, currentValue) => (previousValue.price * previousValue.quantity) + (currentValue.price * currentValue.quantity)
                )
            }&euro;
        </div>
    );
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

export default Modal;