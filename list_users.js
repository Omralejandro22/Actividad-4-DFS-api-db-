const mongoose = require('mongoose');
const MONGO_URI = "mongodb://localhost:27017/inventory_db";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
}, { strict: false });

const User = mongoose.model('User', userSchema);

async function run() {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await User.find({});
        console.log('--- USERS IN DB ---');
        users.forEach(u => {
            const isHashed = u.password && u.password.startsWith('$');
            console.log(`User: '${u.username}' | Role: ${u.role} | PwdHash: ${isHashed ? 'QK' : 'PLAIN TEXT (INVALID)'}`);
        });
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
