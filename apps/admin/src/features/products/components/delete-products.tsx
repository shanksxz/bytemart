"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import { Product } from "@bytemart/types"


interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onDelete: (productId: string) => void
}

export function DeleteProductDialog({ open, onOpenChange, product, onDelete }: DeleteProductDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Product
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete the product "{product.name}"?</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the product and remove it from our servers.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(product.id)
              onOpenChange(false)
            }}
          >
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

