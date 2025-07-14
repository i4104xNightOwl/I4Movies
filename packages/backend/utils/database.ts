import mongoose from 'mongoose';

export default class Database {
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
}
