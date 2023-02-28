import { SchemaDefinition } from 'mongoose';

import BaseDb from './base';

export default new class Product extends BaseDb<ProductModel> {
    /**
     * Creates an instance of Type.
     * @memberof Test
     */
    constructor() {
        const _model: SchemaDefinition = {
            _id: { type: String, required: true, trim: true },
            name: { type: String },
            type: { type: String }
        };

        super('graph-test-product', _model);
    }
};
