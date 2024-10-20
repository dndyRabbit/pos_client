import Content from "@/components/Content";
import { Plus } from "lucide-react";
import FormStore from "./FormStore";
import FormSheets from "@/components/form-sheets";

export default function TabStore() {
  return (
    <Content>
      <div className="flex w-full justify-end">
        <FormSheets text="Add Store" icon={<Plus className="mr-2" size={18} />} content={<FormStore />} title="Create Store" />
      </div>
    </Content>
  );
}
