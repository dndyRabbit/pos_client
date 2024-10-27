"use client"
import { Button } from '@/components/ui/button'
import { Download, Upload } from 'lucide-react'
import React from 'react'

export default function ExportImportButton() {
  return (
    <React.Fragment>
       <Button
        aria-label="Toggle columns"
        variant="outline"
        size="sm"
        className="ml-auto h-8 flex"
      >
        <Download className="mr-2 size-4" />
        Export
      </Button>
      <Button
        aria-label="Toggle columns"
        variant="outline"
        size="sm"
        className="ml-auto h-8 flex"
      >
        <Upload className="mr-2 size-4" />
        Import
      </Button>
    </React.Fragment>
  )
}
