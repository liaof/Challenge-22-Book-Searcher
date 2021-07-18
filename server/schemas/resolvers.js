const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')
          
              return userData;
            } throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No account found with this email');
            }    
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },
        saveBook: async (parent, { input }, context)=> {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:context.user.id},
                    {$push: 
                        { savedBooks: { 
                                bookID: input.bookID,
                                authors: input.authors,
                                description: input.description,
                                title: input.title,
                                image: input.image,
                                link: input.link 
                        }}
                    },
                    { new: true }
                );
                return updatedUser;
            } throw new AuthenticactionError('Please Log In');
        },
        removeBook: async(parent, {bookId}, context) =>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:context.user.id},
                    {$pull: {savedBooks: bookId}},
                    { new: true }
                );
                return updatedUser;
            } throw new AuthenticationError('Please Log In');
        }  
    }
};
// type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(email: String!, username: String!, password: String!): Auth
//     saveBook(input: BookData): Book
//     removeBook(bookId: ID!): User
// }
module.exports = resolvers;