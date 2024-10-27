"use client"
import * as React from "react"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Skeleton } from "@/components/ui/skeleton"
import BreadcumbPages from "@/components/BreadcumbPages";
import Content from "@/components/Content";
import { getListIngredients } from "@/actions/masters";
import DataTable from "./_components/table";
import { columns } from "./_components/columns";
import ExportImportButton from "./_components/export-import-button";

let data = [{url: '', page:'Material', isChild: true}, {url: '/material/ingredients', page:'Ingredients'}]

export default function Ingredients() {
  const [fetching, setFetching] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [list, setList] = React.useState({
    data: [],
    pagination: null
  })
  const [filter, setFilter] = React.useState({
    search: ''
  })

  const fetchListIngredients = async (page = 1, limit = 10) => {
    setLoading(true)
    let params = { page, limit, ...filter}

    for (const prop in params) {
      if (params.hasOwnProperty(prop)) {
        if ((params[prop] === '') || (params[prop] === null)) {
          delete params[prop];
        }
      }
    }

    const res = await getListIngredients(params)
    setList({ data: res.result, pagination: res.pagination})
    setFetching(false)
    setLoading(false)
  }

  React.useEffect(() => {
    const debounces = setTimeout(() => {
      fetchListIngredients();
    }, 400);

    return () => {
      clearTimeout(debounces)
    }
  }, [filter.search])

  return (
    <ContentLayout title="Ingredients">
      <BreadcumbPages data={data} />
      <Content>
        {fetching ? <>
          <Skeleton className="h-7 w-52" />
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        </> : <>
          <div className="flex items-center justify-end space-x-2">
            <ExportImportButton />
          </div>
          {list.data && list.pagination ? 
            <DataTable 
              filter={filter} 
              setFilter={setFilter} 
              data={list.data} 
              columns={columns} 
              pagination={list.pagination} 
              fetchData={fetchListIngredients}  
            /> : <></>
          }
        </>}
      </Content>
    </ContentLayout>
  );
}
