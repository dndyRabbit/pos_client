import { Navbar } from "@/components/admin-panel/navbar";

export function ContentLayout({ title, children }) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container py-2 px-10 sm:px-4">{children}</div>
    </div>
  );
}
