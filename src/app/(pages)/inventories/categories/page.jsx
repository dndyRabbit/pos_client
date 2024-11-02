import * as React from "react"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Skeleton } from "@/components/ui/skeleton"
import BreadcumbPages from "@/components/BreadcumbPages";
import Content from "@/components/Content";
import { getListCategories } from "@/actions/inventories";
import DataTable from "./_components/table";
import { columns } from "./_components/columns";
import ExportImportButton from "./_components/export-import-button";
import { categoriesPages } from "@/app/data/breadcumb-pages";
import removeUnvaluedParams from "@/helper/remove-unvalued-params";

export default async function Categories({ searchParams: { page = 1, limit = 10, search } }) {
  let params = { page, limit, search }
  params = removeUnvaluedParams(params)
  const {result, pagination} = await getListCategories(params)

  return (
    <ContentLayout title="Categories">
      <Content>
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <div className="flex items-center justify-between space-x-2">
            <BreadcumbPages data={categoriesPages} />
            <ExportImportButton />
          </div>
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
          <DataTable 
            data={result} 
            columns={columns} 
            pagination={pagination} 
          /> 
        </React.Suspense>
      </Content>
    </ContentLayout>
  );
}