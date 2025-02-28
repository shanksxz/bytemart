import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus } from "lucide-react"
import { Product } from "@bytemart/types"

// Define the Product type
// interface Product {
//   id: string
//   name: string
//   category: string
//   price: string
//   stock: number
//   status: string
//   image: string
//   description?: string
// }

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
  onSave: (product: Partial<Product>) => void
}

export function ProductDialog({ open, onOpenChange, product, onSave }: ProductDialogProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState(0)
  const [status, setStatus] = useState("Active")
  const [image, setImage] = useState("/placeholder.svg")
  const [description, setDescription] = useState("")

  const isEditMode = !!product

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (open && product) {
      // Edit mode - populate form with product data
      setName(product.name)
      setCategory(product.categoryId || "")
      setPrice(`${product.price}` || "")
      setStock(product.stockQuantity || 0)
      setStatus(product.stockQuantity ? "Active" : "Out of Stock")
      setImage(product.imageUrl || "/placeholder.svg")
      setDescription(product.description || "")
    } else if (open) {
      // Add mode - reset form
      setName("")
      setCategory("")
      setPrice("")
      setStock(0)
      setStatus("Active")
      setImage("/placeholder.svg")
      setDescription("")
    }
  }, [open, product])

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !category || !price) return

    const formattedPrice = price.startsWith("$") ? price : `$${price}`

    const updatedProduct: Partial<Product> = {
      name,
      categoryId: category,
      price: Number(formattedPrice),
      stockQuantity: stock,
      imageUrl: image,
      description,
    }

    if (isEditMode && product) {
      updatedProduct.id = product.id
    }

    onSave(updatedProduct)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details of this product." : "Fill in the details to create a new product."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                  <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number.parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>Product Image</Label>
            <div className="flex items-center gap-4">
              <div className="border rounded-md w-24 h-24 flex items-center justify-center overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Product preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Button variant="outline" type="button" className="h-10 gap-2">
                <ImagePlus className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Recommended size: 800x800px. Max file size: 5MB.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !category || !price}>
            {isEditMode ? "Save Changes" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

