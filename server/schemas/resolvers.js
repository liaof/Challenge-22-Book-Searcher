const { User } = require('../models');
const { signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'asd';
        }
    }

};

module.exports = resolvers;