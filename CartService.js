/**
 * CartService.js
 * Service untuk mengelola keranjang belanja pada platform PesenMakan
 * 
 * Fitur:
 * - Menghitung subtotal
 * - Menghitung pajak (11%)
 * - Menghitung total harga dengan pajak
 */

/**
 * Menghitung total harga dengan pajak 11%
 * @param {number} subtotal - Subtotal harga sebelum pajak
 * @returns {number} Total harga setelah ditambah pajak
 */
function calculateTotal(subtotal) {
    // Validasi input
    if (subtotal < 0) {
        throw new Error("Subtotal tidak boleh negatif");
    }

    // Perhitungan pajak 11%
    const taxRate = 0.11;
    const tax = subtotal * taxRate;
    
    // Total harga = subtotal + pajak
    const total = subtotal + tax;
    
    return Math.round(total * 100) / 100; // Pembulatan ke 2 desimal
}

/**
 * Menghitung potongan harga (diskon)
 * @param {number} subtotal - Subtotal harga
 * @param {number} discountPercentage - Persentase diskon (0-100)
 * @returns {number} Jumlah diskon
 */
function calculateDiscount(subtotal, discountPercentage) {
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new Error("Persentase diskon harus antara 0-100");
    }
    
    const discount = subtotal * (discountPercentage / 100);
    return Math.round(discount * 100) / 100;
}

/**
 * Menghitung total dengan diskon dan pajak
 * @param {number} subtotal - Subtotal harga
 * @param {number} discountPercentage - Persentase diskon (0-100)
 * @returns {number} Total harga akhir
 */
function calculateTotalWithDiscount(subtotal, discountPercentage) {
    const discount = calculateDiscount(subtotal, discountPercentage);
    const afterDiscount = subtotal - discount;
    return calculateTotal(afterDiscount);
}

module.exports = {
    calculateTotal,
    calculateDiscount,
    calculateTotalWithDiscount
};
// Updated on UAS RPL 2025/2026 using GitHub Flow
