


function getTotalAmount(invoices) {
    let totalAmount = 0;
    for (const invoice of invoices) {
        for (const detail of invoice.details) {
            totalAmount += detail.price * detail.quantity;
        }
    }
    return totalAmount;
}