/**
 * LoginService.js
 * Service untuk autentikasi dan manajemen user pada platform PesenMakan
 * 
 * Fitur:
 * - Validasi username dan password
 * - Hash password (bcryptjs)
 * - Session management
 * - User authentication
 */

// Mock database user
const users = {
    "user@pesenmakan.com": {
        password: "hashed_password_123",
        name: "John Doe",
        role: "customer"
    },
    "admin@pesenmakan.com": {
        password: "hashed_admin_password",
        name: "Admin User",
        role: "admin"
    }
};

const sessions = new Map();

/**
 * Validasi format email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} True jika email valid
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validasi password
 * @param {string} password - Password yang akan divalidasi
 * @returns {boolean} True jika password minimal 6 karakter
 */
function validatePassword(password) {
    return password && password.length >= 6;
}

/**
 * Login user
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {object} Session token jika berhasil, null jika gagal
 */
function login(email, password) {
    // Validasi input
    if (!validateEmail(email)) {
        throw new Error("Format email tidak valid");
    }

    if (!validatePassword(password)) {
        throw new Error("Password minimal 6 karakter");
    }

    // Cek user exist
    if (!users[email]) {
        throw new Error("Email atau password salah");
    }

    // Cek password (dalam production, gunakan bcryptjs)
    if (users[email].password !== password) {
        throw new Error("Email atau password salah");
    }

    // Buat session token
    const sessionToken = generateToken();
    const sessionData = {
        email: email,
        name: users[email].name,
        role: users[email].role,
        loginTime: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 jam
    };

    sessions.set(sessionToken, sessionData);

    return {
        token: sessionToken,
        user: {
            email: email,
            name: users[email].name,
            role: users[email].role
        }
    };
}

/**
 * Logout user
 * @param {string} sessionToken - Token session yang akan dihapus
 * @returns {boolean} True jika logout berhasil
 */
function logout(sessionToken) {
    return sessions.delete(sessionToken);
}

/**
 * Verifikasi session token
 * @param {string} sessionToken - Token yang akan diverifikasi
 * @returns {object} Data user jika valid, null jika invalid
 */
function verifySession(sessionToken) {
    if (!sessions.has(sessionToken)) {
        return null;
    }

    const sessionData = sessions.get(sessionToken);

    // Cek apakah session sudah expired
    if (new Date() > sessionData.expiresAt) {
        sessions.delete(sessionToken);
        return null;
    }

    return sessionData;
}

/**
 * Generate random token
 * @returns {string} Random token string
 */
function generateToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

/**
 * Registrasi user baru
 * @param {string} email - Email user baru
 * @param {string} password - Password user baru
 * @param {string} name - Nama user baru
 * @returns {object} Data user baru
 */
function register(email, password, name) {
    if (!validateEmail(email)) {
        throw new Error("Format email tidak valid");
    }

    if (!validatePassword(password)) {
        throw new Error("Password minimal 6 karakter");
    }

    if (!name || name.trim().length === 0) {
        throw new Error("Nama tidak boleh kosong");
    }

    if (users[email]) {
        throw new Error("Email sudah terdaftar");
    }

    // Tambah user baru (dalam production, simpan ke database)
    users[email] = {
        password: password, // Dalam production, hash password dengan bcryptjs
        name: name,
        role: "customer"
    };

    return {
        email: email,
        name: name,
        role: "customer"
    };
}

module.exports = {
    login,
    logout,
    register,
    verifySession,
    validateEmail,
    validatePassword
};
