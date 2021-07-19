const { User, Book } = require('../models');
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
        },
        helloWorld: () => {
            return 'Hello world!';
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
        saveBook: async (parent, args, context)=> {
            console.log(args)
            console.log(context.user);
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:context.user._id },
                    { $push: { savedBooks: args }},
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (e) {
                console.log(e);
            }
        },
        removeBook: async(parent, bookId, context) =>{
            const updatedUser = await User.findOneAndUpdate(
                { _id:context.user._id },
                { $pull: { savedBooks: bookId }},
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!");
            }
            return updatedUser;
            // if (context.user) {
            //     const updatedUser = await User.findOneAndUpdate(
            //         {_id:context.user.id},
            //         { $pull: { savedBooks: { bookId: bookId }}},
            //         { new: true }
            //     );
            //     return updatedUser;
            // } throw new AuthenticationError('Please Log In');
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

// authors='asdasd';
// description="asdasdasd";
// bookId="ASDASd";
// title="bbbbb";
// image="nwer";
// link="909wef";
// console.log(Book);