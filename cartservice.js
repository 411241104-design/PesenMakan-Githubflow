function calculateTotal(subtotal) {
    const tax = subtotal * 0.11;
    return subtotal + tax;
}

module.exports = calculateTotal;
