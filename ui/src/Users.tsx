import * as React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

function User(props: { user: any }) {
    return <div>{JSON.stringify(props.user)}</div>;
}

const ADD_USER = gql`
    mutation addUser(
        $email: String!
        $name: String!
        $posts: [PostCreateInput!]
    ) {
        signupUser(data: { email: $email, name: $name, posts: $posts }) {
            id
            name
            email
            posts {
                id
                content
                title
            }
        }
    }
`;

const REMOVE_USERS = gql`
    mutation removeAll {
        removeAll {
            name
        }
    }
`;

const GET_USERS = gql`
    query allUsers {
        allUsers {
            id
            name
            email
            posts {
                id
                content
                title
            }
        }
    }
`;

export default function Users() {
    const { error, loading, data } = useQuery(GET_USERS);
    const [addUserMut] = useMutation(ADD_USER, {
        refetchQueries: [GET_USERS],
    });
    const [removeUsers] = useMutation(REMOVE_USERS, {
        refetchQueries: [GET_USERS],
    });

    const handleAddUser = () => {
        addUserMut({
            variables: {
                name: "Amogh Rijal",
                email: `xamoghx@gmail.com${Math.floor(Math.random() * 1000)}`,
                posts: [
                    {
                        title: `${Math.floor(Math.random() * 1000)}`,
                        content: "hahaah",
                    },
                ],
            },
        });
    };

    if (error) return <div>Error</div>;
    if (loading) return <div>Loading</div>;

    return (
        <div>
            <button onClick={handleAddUser}>Add user</button>
            <button onClick={() => removeUsers()}>Remove Users</button>
            {data.allUsers.map((user) => (
                <User user={user} key={user.email} />
            ))}
        </div>
    );
}
