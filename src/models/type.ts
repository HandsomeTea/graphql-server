import { SchemaDefinition } from 'mongoose';

import BaseDb from './base';

export default new class Type extends BaseDb<TypeModel> {
    /**
     * Creates an instance of Type.
     * @memberof Test
     */
    constructor() {
        const _model: SchemaDefinition = {
            _id: { type: String, required: true, trim: true },
            name: { type: String }
        };

        super('graph-test-type', _model);
    }
};
