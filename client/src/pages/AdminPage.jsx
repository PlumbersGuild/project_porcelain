import { useGetUsersQuery } from "../reducers/api";

function AdminPage() {
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <>LOADING...</>;
  }
  console.log("users", data);
  console.log(data[0].isAdmin);
  return (
    <div className="admin_container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Permission Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {user.isAdmin ? <td>Admin</td> : <td>User</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
