"use client"
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import React, { useRef } from 'react'

export default function FormStore() {
  const sheetCloseRef = useRef(null);
  const closeModal = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click(); 
    }
  };

  return (
    <React.Fragment>
      <div className="overflow-auto h-[85vh] my-2">
        
      </div>
      <div className='flex justify-end space-x-2'>
        <SheetClose>
          <Button ref={sheetCloseRef} type="button" variant="default" >Close</Button>
        </SheetClose>
        <Button onClick={closeModal} type="button" variant="default">Save & Close</Button>
        <Button type="button" variant="default">Save Changes</Button>
      </div>
    </React.Fragment>
  )
}
