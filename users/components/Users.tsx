import React from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const router = useRouter();

  return (
    <div>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
            key={user.id}
            onClick={() => {
              router.push(`/users/${user.id}`);
            }}
          >
            <div>
              <h5>
                {user.id} {user.first_name} {user.last_name}
              </h5>
              <p>{user.email}</p>
            </div>
            <img
              src={user.avatar}
              style={{ borderRadius: "50%" }}
              alt={`Avatar of ${user.first_name} ${user.last_name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
