/**
 * Simple MongoDB Connection Test Script
 * Run with: node test-mongodb.js
 */

const mongoose = require('mongoose');

(async () => {
  try {
    let MONGODB_URI;
    try {
      const mod = await import('./config.js');
      const config = mod.default || mod;
      MONGODB_URI = config.databaseURL;
    } catch (importErr) {
      const fs = require('fs');
      const cfgText = fs.readFileSync('./config.js', 'utf8');
      const m = cfgText.match(/databaseURL\s*[:=]\s*["'`]([^"'`]+)["'`]/);
      if (m && m[1]) {
        MONGODB_URI = m[1];
      } else {
        throw importErr;
      }
    }

    console.log(' Testing MongoDB connection...');
    console.log(' Connection string:', MONGODB_URI);
    console.log('');

    async function testConnection() {
      try {
        console.log(' Connecting to MongoDB...');
        
        const connection = await mongoose.connect(MONGODB_URI, {
          serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });

        console.log(' Sccessfully connected to MongoDB!');
        console.log(' Database name:', connection.connection.db.databaseName);
        console.log(' Host:', connection.connection.host);
        console.log(' Port:', connection.connection.port);
        console.log('');

        // Test database operations
        console.log('⏳ Testing database operations...');
        try {
          const collections = await connection.connection.db.listCollections().toArray();
          console.log(`Found ${collections.length} collection(s):`);
          collections.forEach(col => console.log(`   - ${col.name}`));
          console.log('');
        } catch (authError) {
          if (authError.message.includes('authentication') || authError.message.includes('auth')) {
            console.log('⚠️  Database requires authentication for listing collections.');
          } else {
            throw authError;
          }
        }

        // Create a test collection
        console.log('⏳ Creating test collection "testusers"...');
        const testUsersCollection = connection.connection.db.collection('testusers');
        
        // Drop collection if it exists to start fresh
        try {
          await testUsersCollection.drop();
          console.log('🗑️  Dropped existing "testusers" collection');
        } catch (err) {
          // Collection doesn't exist yet, that's fine
        }
        console.log('');

        console.log('⏳ Inserting sample data...');
        const sampleUsers = [
          {
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            createdAt: new Date(),
          },
          {
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            createdAt: new Date(),
          },
          {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'user',
            createdAt: new Date(),
          },
        ];

        const insertResult = await testUsersCollection.insertMany(sampleUsers);
        console.log(`✅ Inserted ${insertResult.insertedCount} documents`);
        console.log('');

        // Get all data
        console.log(' Retrieving all documents from "testusers"...');
        const allUsers = await testUsersCollection.find({}).toArray();
        console.log(` Found ${allUsers.length} document(s):`);
        console.log('');
        allUsers.forEach((user, index) => {
          console.log(`  [${index + 1}] ${user.name}`);
          console.log(`      Email: ${user.email}`);
          console.log(`      Role: ${user.role}`);
          console.log(`      ID: ${user._id}`);
          console.log('');
        });

        console.log(' All database tests completed successfully!');
        
        // Close the connection
        await mongoose.connection.close();
        console.log(' Connection closed.');
        process.exit(0);

      } catch (error) {
        console.error('❌ MongoDB connection failed!');
        console.error('');
        console.error('Error details:');
        console.error('  Message:', error.message);
        
        if (error.name === 'MongooseServerSelectionError') {
          console.error('');
          console.error(' Possible solutions:');
          console.error('   1. Check if MongoDB server is running');
          console.error('   2. Verify the connection string in .env file');
          console.error('   3. Check firewall/network settings');
          console.error('   4. Ensure the host and port are correct');
        }
        
        process.exit(1);
      }
    }

    await testConnection();

  } catch (err) {
    console.error('Failed to load config.js via dynamic import:', err && err.stack ? err.stack : err);
    process.exit(1);
  }

})();
