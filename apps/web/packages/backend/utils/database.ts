import mongoose from 'mongoose';

export class Database {
    private static instance: Database | undefined;

    private constructor() { }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance.connect();
        }
        return Database.instance;
    }

    private async connect() {
        try {
            await mongoose.connect('mongodb://localhost:27017/movies');
            console.log('✅ Database connected');
        } catch (error) {
            console.error('❌ Database connection failed:', error);
            throw error;
        }
    }

    public static async disconnect() {
        if (Database.instance) {
            await mongoose.disconnect();
            Database.instance = undefined;
            console.log('🛑 Database disconnected');
        }
    }

    public static async dropDatabase() {
        if (Database.instance) {
            const collections = mongoose.connection.collections;

            for (const key in collections) {
                const collection = collections[key];
                try {
                    await collection.deleteMany({});
                } catch (err) {
                    console.error(`❌ Failed to clear collection ${key}:`, err);
                }
            }
            console.log('🛑 Database dropped');
        }
    }
}
