"use client"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcumbPages from "@/components/BreadcumbPages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TabStore from "./components/TabStore";
import TabEmployeeSchedules from "./components/TabEmployeeSchedules";
import TabPromotions from "./components/TabPromotions";

let data = [{url: '/store-management', page:'Store Management'}]

export default function StoreManagement() {
  const [tab] = useState([
    {value: 1, label: 'Store'},
    {value: 2, label: 'Employees Schedules'},
    {value: 3, label: 'Promotions & Discounts'},
    // {value: 4, label: 'Summary'},
  ])

  return (
    <ContentLayout title="Store Management">
      <BreadcumbPages data={data} />

      <Tabs defaultValue={1} className="w-full">
        <TabsList className="grid grid-cols-3">
          {tab?.map((val, index) => (
            <TabsTrigger key={index} value={val.value}>{val.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={1}>
          <TabStore />
        </TabsContent>

        <TabsContent value={2}>
          <TabEmployeeSchedules />
        </TabsContent>

        <TabsContent value={3}>
          <TabPromotions />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
