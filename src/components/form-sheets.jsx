import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function FormSheets({text, icon, content, description, title}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-green-500">{icon} {text}</Button>
      </SheetTrigger>
      <SheetContent className="min-w-[50%] h-full">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>
            {description}
          </SheetDescription>}
        </SheetHeader>
        
        {content}
      </SheetContent>
    </Sheet>  
  );
}
