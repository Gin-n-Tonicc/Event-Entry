import AdminTableApi from '../admin-table-api/AdminTableApi';

// The component that displays the admin users table
export default function AdminTableEvents() {
  return (
    <AdminTableApi
      tableName="Events"
      apiPathname="/events"
      create={false}
      delete={true}
      update={true}
    />
  );
}
