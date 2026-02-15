const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log(`\nFound ${users.length} users:`);

        users.forEach(user => {
            const isHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
            console.log(`- Username: ${user.username}`);
            console.log(`  Role: ${user.role}`);
            console.log(`  Password (first 10 chars): ${user.password.substring(0, 10)}...`);
            console.log(`  Is Hashed (likely): ${isHashed ? 'YES' : 'NO (Login will fail!)'}`);
            console.log('---');
        });

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
