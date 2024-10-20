import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function App({
  children
}) {
  return <AdminPanelLayout>
    {children}
  </AdminPanelLayout>;
}
