import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductDialog } from "@/features/products/components/edit-products"
import { DeleteProductDialog } from "@/features/products/components/delete-products"
import { useProducts } from "../api/get-products"
import type { Product } from "@bytemart/types"
import { useEditProduct } from "../api/edit-product"
import { useDeleteProduct } from "../api/delete.product"

export default function ProductView() {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [productDialogOpen, setProductDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const { data, isLoading, error } = useProducts({});

    //TODO: implement editProduct and deleteProduct
    // const {
    //     mutate: editProduct,
    //     isLoading: isEditing,
    //     error: editError,
    //     data: editData,
    // } = useEditProduct({});

    // const {
    //     mutate: deleteProduct,
    //     isLoading: isDeleting,
    //     error: deleteError,
    //     data: deleteData,
    // } = useDeleteProduct({});

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                Loading..........
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-red-500">Failed to load products: {data?.error || (error as Error)?.message}</p>
            </div>
        )
    }

    const products = data?.data || [];

    const getProductStatus = (stockQuantity: number) => {
        if (stockQuantity <= 0) return "Out of Stock"
        if (stockQuantity < 20) return "Low Stock"
        return "Active"
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter
        const productStatus = getProductStatus(product.stockQuantity)
        const matchesStatus = statusFilter === "all" || productStatus === statusFilter
        return matchesSearch && matchesCategory && matchesStatus
    })

    const toggleProductSelection = (productId: string) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId))
        } else {
            setSelectedProducts([...selectedProducts, productId])
        }
    }

    const toggleAllProducts = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([])
        } else {
            setSelectedProducts(filteredProducts.map((product) => product.id))
        }
    }

    const handleAddProduct = () => {
        setSelectedProduct(null)
        setProductDialogOpen(true)
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product)
        setProductDialogOpen(true)
    }

    const handleDeleteProduct = (product: Product) => {
        setSelectedProduct(product)
        setDeleteDialogOpen(true)
    }

    const handleSaveProduct = (updatedProduct: Partial<Product>) => {
        if (selectedProduct) {
            const updatedProducts = products.map((p) => (p.id === selectedProduct.id ? { ...p, ...updatedProduct } : p))
            // console.log("Updated product:", updatedProduct)
            // editProduct({ productId: selectedProduct.id, product: updatedProducts })
        } else {
            const newProduct = {
                id: `PROD-${String(Date.now()).slice(-3)}`,
                ...updatedProduct,
                stock: updatedProduct.stockQuantity || 0,
                status: updatedProduct.stockQuantity ? "Active" : "Out of Stock",
                image: updatedProduct.imageUrl || "/placeholder.svg",
            } as Product

            console.log("New product:", newProduct)
        }
        setProductDialogOpen(false)
    }

    const handleDeleteConfirm = (productId: string) => {
        console.log("Deleted product:", productId)
        setDeleteDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex w-full sm:w-auto items-center gap-2">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                            <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Low Stock">Low Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-full sm:w-auto items-center gap-2">
                    {selectedProducts.length > 0 && (
                        <>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Trash className="h-4 w-4" />
                                Delete
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </>
                    )}
                    <Button size="sm" className="h-8 gap-1 ml-auto" onClick={handleAddProduct}>
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                        onCheckedChange={toggleAllProducts}
                                    />
                                </TableHead>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                        No products found. Try adjusting your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onCheckedChange={() => toggleProductSelection(product.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={product.imageUrl} alt={product.name} />
                                                <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.categoryId}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.stockQuantity}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    getProductStatus(product.stockQuantity) === "Active"
                                                        ? "default"
                                                        : getProductStatus(product.stockQuantity) === "Low Stock"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                            >
                                                {getProductStatus(product.stockQuantity)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteProduct(product)}
                                                        className="text-destructive focus:text-destructive"
                                                    >
                                                        <Trash className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* //TODO: implement pagination with infiniteReactQuery */}
            {/* <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                        1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                        2
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            </div> */}
            <ProductDialog
                open={productDialogOpen}
                onOpenChange={setProductDialogOpen}
                product={selectedProduct || undefined}
                onSave={handleSaveProduct}
            />

            <DeleteProductDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                product={selectedProduct}
                onDelete={handleDeleteConfirm}
            />
        </div>
    )
}

