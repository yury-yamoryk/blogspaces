import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import User from "../entities/User";

const Blogs: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        UserService.getAll()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

  return (
    <div className="col-md-6">
        <h1>Blogs</h1>

        <ul className="list-group">
            {users && users.map((user, index) => (
                <li
                    className="list-group-item"
                    key={index}
                >
                    {user.name}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default Blogs;