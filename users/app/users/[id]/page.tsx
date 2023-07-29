import React from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

async function getUser(id: number): Promise<User> {
  console.log(id);
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const data = await res.json();
  console.log(data);
  return data.data;
}

interface UsersProps {
  params: {
    id: number;
  };
}

const Users: React.FC<UsersProps> = ({ params }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser(params.id);
      setUser(fetchedUser);
    }
    fetchUser();
  }, [params.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-header text-center">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="card-body text-center">
            <h5>
              {user.id} {user.first_name} {user.last_name}
            </h5>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
