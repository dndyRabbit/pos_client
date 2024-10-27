import { Navbar } from "@/components/admin-panel/navbar";

export function ContentLayout({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar title={title} />
      <div className="container py-4 px-4">{children}</div>
    </div>
  );
}
