import AdminTableApi from '../admin-table-api/AdminTableApi';

// The component that displays the admin users table
export default function AdminTableSkills() {
  return (
    <AdminTableApi
      tableName="Skills"
      apiPathname="/skills"
      create={true}
      delete={true}
      update={true}
    />
  );
}
