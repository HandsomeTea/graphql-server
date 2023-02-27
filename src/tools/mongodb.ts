import mongoose from 'mongoose';
import { getENV, system } from '@/configs';

export default new class MongoDB {
    constructor() {
        if (!this.isUseful) {
            return;
        }

        this.init();
    }

    private async init() {
        const mongodbAddress = getENV('DB_URL');

        if (!mongodbAddress) {
            return system('mongodb').error(`mongodb connect address is required but get ${mongodbAddress}`);
        }
        await mongoose.connect(mongodbAddress, {});
        // 初始化操作
        this.server.once('connected', () => {// 连接成功
            system('mongodb').info(`mongodb connected on ${getENV('DB_URL')} success and ready to use.`);
        });

        this.server.on('disconnected', () => {// 连接失败或中断
            system('mongodb').fatal('disconnected! connection is break off.');
        });

        this.server.on('reconnected', () => {// 重新连接成功
            system('mongodb').info(`reconnect on ${getENV('DB_URL')} success and ready to use.`);
        });
    }

    /**
     * 系统是否采用mongodb作为数据库
     * @readonly
     * @private
     */
    private get isUseful() {
        return !!getENV('DB_URL');
    }

    public get server() {
        if (!this.isUseful) {
            system('mongodb').warn('mongodb is not available!');
        }
        return mongoose.connection;
    }

    public get schema() {
        return mongoose.Schema;
    }

    public get isOK() {
        return !this.isUseful || this.isUseful && this.server.readyState === 1;
    }

    public async close(): Promise<void> {
        if (this.isUseful) {
            await this.server.close();
        }
    }
};
