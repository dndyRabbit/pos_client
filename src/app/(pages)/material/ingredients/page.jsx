"use client"

import * as React from "react"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { TasksTable } from "@/app/_components/tasks-table";
import { TasksTableProvider } from "@/app/_components/tasks-table-provider";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Skeleton } from "@/components/ui/skeleton"
import BreadcumbPages from "@/components/BreadcumbPages";
import Content from "@/components/Content";

let data = [{url: '', page:'Material', isChild: true}, {url: '/material/ingredients', page:'Ingredients'}]

export default function Ingredients() {
  return (
    <ContentLayout title="Ingredients">
      <BreadcumbPages data={data} />

      <Content>
        <TasksTableProvider>
          {/**
           * The `DateRangePicker` component is used to render the date range picker UI.
           * It is used to filter the tasks based on the selected date range it was created at.
           * The business logic for filtering the tasks based on the selected date range is handled inside the component.
           */}
          <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
            <DateRangePicker
              triggerSize="sm"
              triggerClassName="ml-auto w-56 sm:w-60"
              align="end"
              shallow={false}
            />
          </React.Suspense>
          <React.Suspense
            fallback={
              <DataTableSkeleton
                columnCount={5}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                shrinkZero
              />
            }
          >
            <TasksTable tasksPromise={[]} />
          </React.Suspense>
        </TasksTableProvider>
      </Content>
    </ContentLayout>
  );
}
