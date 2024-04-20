import AdminTableApi from '../admin-table-api/AdminTableApi';

// The component that displays the admin users table
export default function AdminTableUsers() {
  return (
    <AdminTableApi
      tableName="Users"
      apiPathname="/users"
      create={false}
      delete={true}
      update={true}
    />
  );
}
