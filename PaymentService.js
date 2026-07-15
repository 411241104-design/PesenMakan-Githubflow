/**
 * PaymentService.js
 * Service untuk mengelola proses pembayaran pada platform PesenMakan
 * 
 * Fitur:
 * - Validasi metode pembayaran
 * - Proses pembayaran
 * - Riwayat transaksi
 * - Generate invoice
 */

// Mock database untuk riwayat transaksi
const transactions = [];

/**
 * Validasi metode pembayaran yang tersedia
 * @param {string} method - Metode pembayaran (transfer, credit_card, e_wallet)
 * @returns {boolean} True jika metode valid
 */
function validatePaymentMethod(method) {
    const validMethods = ["transfer", "credit_card", "e_wallet", "cash"];
    return validMethods.includes(method);
}

/**
 * Proses pembayaran
 * @param {object} paymentData - Data pembayaran
 * @param {string} paymentData.orderId - ID pesanan
 * @param {number} paymentData.amount - Jumlah pembayaran
 * @param {string} paymentData.method - Metode pembayaran
 * @param {string} paymentData.userEmail - Email user yang melakukan pembayaran
 * @returns {object} Hasil pembayaran
 */
function processPayment(paymentData) {
    // Validasi input
    if (!paymentData.orderId || paymentData.orderId.trim().length === 0) {
        throw new Error("Order ID tidak boleh kosong");
    }

    if (paymentData.amount <= 0) {
        throw new Error("Jumlah pembayaran harus lebih dari 0");
    }

    if (!validatePaymentMethod(paymentData.method)) {
        throw new Error("Metode pembayaran tidak valid");
    }

    if (!paymentData.userEmail || paymentData.userEmail.trim().length === 0) {
        throw new Error("Email user tidak boleh kosong");
    }

    // Simulasi proses pembayaran
    const transactionId = generateTransactionId();
    const timestamp = new Date();

    const transaction = {
        transactionId: transactionId,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        method: paymentData.method,
        userEmail: paymentData.userEmail,
        status: "success",
        timestamp: timestamp,
        invoiceNumber: generateInvoiceNumber()
    };

    // Simpan ke riwayat transaksi
    transactions.push(transaction);

    return {
        success: true,
        transactionId: transactionId,
        invoiceNumber: transaction.invoiceNumber,
        amount: paymentData.amount,
        method: paymentData.method,
        message: "Pembayaran berhasil diproses"
    };
}

/**
 * Verifikasi pembayaran
 * @param {string} transactionId - ID transaksi yang akan diverifikasi
 * @returns {object} Data transaksi jika ditemukan
 */
function verifyPayment(transactionId) {
    const transaction = transactions.find(t => t.transactionId === transactionId);

    if (!transaction) {
        return null;
    }

    return {
        transactionId: transaction.transactionId,
        orderId: transaction.orderId,
        amount: transaction.amount,
        status: transaction.status,
        timestamp: transaction.timestamp
    };
}

/**
 * Generate ID transaksi unik
 * @returns {string} Transaction ID
 */
function generateTransactionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN-${timestamp}-${random}`;
}

/**
 * Generate nomor invoice
 * @returns {string} Invoice number
 */
function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const sequence = String(transactions.length + 1).padStart(5, "0");
    
    return `INV-${year}${month}${day}-${sequence}`;
}

/**
 * Dapatkan riwayat transaksi user
 * @param {string} userEmail - Email user
 * @returns {array} Array transaksi user
 */
function getTransactionHistory(userEmail) {
    return transactions.filter(t => t.userEmail === userEmail);
}

/**
 * Hitung total pembayaran berdasarkan metode
 * @param {string} method - Metode pembayaran
 * @returns {number} Total pembayaran untuk metode tersebut
 */
function getTotalByMethod(method) {
    return transactions
        .filter(t => t.method === method && t.status === "success")
        .reduce((total, t) => total + t.amount, 0);
}

/**
 * Generate laporan pembayaran harian
 * @param {Date} date - Tanggal laporan
 * @returns {object} Laporan pembayaran
 */
function getDailyReport(date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayTransactions = transactions.filter(
        t => t.timestamp >= dayStart && t.timestamp <= dayEnd && t.status === "success"
    );

    const totalAmount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalTransactions = dayTransactions.length;

    return {
        date: date.toISOString().split("T")[0],
        totalTransactions: totalTransactions,
        totalAmount: Math.round(totalAmount * 100) / 100,
        byMethod: {
            transfer: dayTransactions.filter(t => t.method === "transfer").length,
            credit_card: dayTransactions.filter(t => t.method === "credit_card").length,
            e_wallet: dayTransactions.filter(t => t.method === "e_wallet").length,
            cash: dayTransactions.filter(t => t.method === "cash").length
        }
    };
}

module.exports = {
    processPayment,
    verifyPayment,
    getTransactionHistory,
    getTotalByMethod,
    getDailyReport,
    validatePaymentMethod
};
