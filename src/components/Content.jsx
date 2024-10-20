import { Card, CardContent } from "./ui/card";

export default function Content({children}) {
  return (
    <Card className="rounded-lg border-none">
      <CardContent className="p-6">
        <div className="flex flex-col h-[calc(100vh-56px-64px-20px-24px-56px-48px)] overflow-auto">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
