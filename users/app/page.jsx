async function fetchUsers() {
  const res = await fetch("https://reqres.in/api/users");
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const users = await fetchUsers();
  console.log(users);
  return (
    <>
      <h1>Hola</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <h5>{user.id}</h5>
              <p>{user.email}</p>
            </div>
            <img src={user.avatar} />
          </li>
        ))}
      </ul>
    </>
  );
}
