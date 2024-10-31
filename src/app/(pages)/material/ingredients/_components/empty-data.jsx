import React from 'react'
import Image from "next/image";
import NoData from '@/assets/empty-image/no-data.png'
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from 'lucide-react';

export default function EmptyData({createData = () => {}, importData = () => {}, label}) {
  return (
    <div className="flex h-[600px] items-center justify-center rounded-lg border">
      <div className="flex max-w-sm flex-col items-center justify-center gap-5 p-3">
        <Image src={NoData} alt="empty"  width={150} className="object-contain" />
        <h1 className="text-center text-lg font-bold md:text-start">No Data Found.</h1>
        <p className="text-center">
          Looks like you dont have the spesific data, try to import an existed data or create a new one.
        </p>
        <div className="flex gap-4">
          <Button 
            type="button" 
            onClick={createData} 
            variant="outline"
            size="sm"
            className="ml-auto h-8"
          >
            <Upload className="mr-2 size-4" />
            Import {label}s
          </Button>
          <Button 
            type="button" 
            onClick={importData}
            size="sm"
            className="ml-auto h-8"
          >
            <PlusCircle className="mr-2 size-4" />
            Create {label}
          </Button>
        </div>
      </div>
    </div>
  );
}
