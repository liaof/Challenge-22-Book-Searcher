import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const SAVE_BOOK = gql`
// mutation saveBook($authors:[String],$description:String,$bookId:String,$title:String,$image:String,$link:String,$id:ID,$username:String,$email:String) {
//   saveBook(authors:$authors,description:$description,bookId:$bookId,title:$title,image:$image,link:$link,_id:$id,username:$username,email:$email){
//       savedBooks{
//         authors
//         description
//         bookId
//         title
//         image
//         link
//       }
//   }
// }`;
export const SAVE_BOOK = gql`
mutation saveBook($authors:[String],$description:String,$bookId:String,$title:String,$image:String,$link:String) {
  saveBook(authors:$authors,description:$description,bookId:$bookId,title:$title,image:$image,link:$link){
    _id
    username
    email  
      savedBooks{
        authors
        description
        bookId
        title
        image
        link
      }
  }
}`;