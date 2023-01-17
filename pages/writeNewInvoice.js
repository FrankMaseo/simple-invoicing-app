import useSWR from 'swr';

export default function submitInvoice(
    clientFirstName,
    clientLastName,
    clientEmail,
    details)
{
    //Check that invoice.json exists

    let invoiceDB = Index();
    //Check last invoice ID
    console.log(invoiceDB.invoices);
    //Construct json object to add
    let newInvoice = invoiceBuilder(
        clientFirstName,
        clientLastName,
        clientEmail,
        details
    );


    //append new invoice to all invoices
    //invoiceDB.invoices.push(newInvoice);

    //write to the "backend"
    //saveData();

    console.log(Index());
}


//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function Index() {
    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    const { data, error } = useSWR('/api/readstaticdata', fetcher);

    //Handle the error state
    if (error) return 'err';
    //Handle the loading state
    if (!data) return 'load';
    //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
    return data;
}

function invoiceDate() {
    //returns today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function invoiceBuilder(
    _clientFirstName,
    _clientLastName,
    _clientEmail,
    _details
) {

    //refine details
    let invoiceDetails = _details.map(x => x.isDeleted ? { "key": x.key, "description": "", "price": 0, "quantity": 0 } : { "key": x.key, "description": x.description, "price": x.price, "quantity": x.quantity });

    let invoiceDate = async () => await invoiceDate();

    return {
        invoiceId: "A1",
        invoiceDate: invoiceDate,
        clientFirstName: _clientFirstName,
        clientLastName: _clientLastName,
        clientEmail: _clientEmail,
        details: invoiceDetails
        };
}


