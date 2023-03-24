// import mongoose from 'mongoose';
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

const items = [
    { id: '1', name: '吃的' },
    { id: '2', name: '喝的' },
    { id: '3', name: '用的' }
];
let products = [
    { id: '1', name: '浪味仙', type: '1' },
    { id: '2', name: '炸鸡', type: '1' },
    { id: '3', name: '旺旺仙贝', type: '1' },
    { id: '4', name: '汉堡', type: '1' },
    { id: '5', name: '茶颜悦色', type: '2' },
    { id: '6', name: '纸巾', type: '3' }
];

const productGraphQLType = new GraphQLObjectType({
    name: 'product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString }
    })
});

const itemGraphQLType = new GraphQLObjectType({
    name: 'item',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(productGraphQLType), //每个分类下是一个数组，而不是一个对象
            resolve(parent) { //parent代表上一层
                return products.filter(item => item.type === parent.id);
            }
        }
    })
});

const queryType = new GraphQLObjectType({
    name: 'gql_query',
    fields: {
        getItem: {
            type: itemGraphQLType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(_source, args) {
                return items.find(item => item.id === args.id);
            }
        },
        getItems: {
            type: new GraphQLList(itemGraphQLType),
            resolve() {
                return items;
            }
        },
        getProduct: {
            type: new GraphQLList(productGraphQLType), //有可能一个id对多个商品
            args: {
                type: {
                    type: GraphQLString
                }
            },
            resolve(_parent, args) {
                return products.filter((item) => item.type === args.type);
            }
        },
        getProducts: {
            type: new GraphQLList(productGraphQLType),
            resolve() {
                return products;
            }
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'gql_operate',
    fields: {
        addItem: {
            type: itemGraphQLType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_parent, data) {
                const _item = {
                    id: `${items.length + 1}`,
                    ...data
                };

                items.push(_item);
                return _item;
            }
        },
        addProduct: {
            type: productGraphQLType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                type: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(_parent, data) {
                const _product = {
                    id: `${products.length + 1}`,
                    ...data
                };

                products.push(_product);
                return _product;
            }
        },
        delProductByName: {
            type: new GraphQLList(productGraphQLType),
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_parent, data) => {
                products = products.filter(_product => _product.name !== data.name);

                return products;
            }
        }
    }
});


export default new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
