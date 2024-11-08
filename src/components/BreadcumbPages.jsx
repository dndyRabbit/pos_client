
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";

export default function BreadcumbPages({data}) {
  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        {data?.map((val, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <BreadcrumbSeparator />}
            {val.isChild ? 
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={val.url}>{val.page}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>  : 
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{val.page}</BreadcrumbPage>
              </BreadcrumbItem>
            }
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
      