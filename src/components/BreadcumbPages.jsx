
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

export default function BreadcumbPages({data}) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {data?.map((val, index) => (
          <React.Fragment>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={index}>
              <BreadcrumbPage href={val.url}>{val.page}</BreadcrumbPage>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
      