  "use client"

  import { useState } from "react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  } from "@/components/ui/dialog"
  import { Pencil, Plus, Trash2 } from "lucide-react"
  import Navbar from "@/components/navbar"
  import AuthCheck from "@/components/auth-check"
  import { useProducts } from "@/lib/product-data"
  import { useOrders, type Order } from "@/lib/order-data"

  export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { orders, updateOrderStatus } = useOrders()
  const [newProduct, setNewProduct] = useState({ name: "", price: "" })
  const [editingProduct, setEditingProduct] = useState<{ id: string; name: string; price: string } | null>(null)

  const handleAddProduct = () => {
  if (newProduct.name && newProduct.price) {
  addProduct({
  name: newProduct.name,
  price: Number.parseFloat(newProduct.price),
  image: "/placeholder.svg?height=100&width=100",
  })
  setNewProduct({ name: "", price: "" })
  }
  }

  const handleUpdateProduct = () => {
  if (editingProduct && editingProduct.name && editingProduct.price) {
  updateProduct(editingProduct.id, {
  name: editingProduct.name,
  price: Number.parseFloat(editingProduct.price),
  })
  setEditingProduct(null)
  }
  }

  const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  })
  }

  return (
  // <AuthCheck adminOnly>
  <div className="flex flex-col min-h-screen items-center justify-center">
  {/* <Navbar /> */}
  <main className="flex-1 container py-8">
  <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

  <Tabs defaultValue="products">
  <TabsList className="mb-6">
  <TabsTrigger value="products">Manage Products</TabsTrigger>
  <TabsTrigger value="orders">View Orders</TabsTrigger>
  </TabsList>

  <TabsContent value="products">
  <div className="space-y-6">
  <Card>
  <CardHeader>
  <CardTitle>Add New Product</CardTitle>
  <CardDescription>Add a new product to your inventory</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
  <div className="space-y-2">
  <Label htmlFor="productName">Product Name</Label>
  <Input
  id="productName"
  placeholder="Enter product name"
  value={newProduct.name}
  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
  />
  </div>
  <div className="space-y-2">
  <Label htmlFor="productPrice">Price (₹)</Label>
  <Input
  id="productPrice"
  type="number"
  placeholder="Enter price"
  value={newProduct.price}
  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
  />
  </div>
  </CardContent>
  <CardFooter>
  <Button onClick={handleAddProduct}>
  <Plus className="mr-2 h-4 w-4" /> Add Product
  </Button>
  </CardFooter>
  </Card>

  <Card>
  <CardHeader>
  <CardTitle>Product Inventory</CardTitle>
  <CardDescription>Manage your existing products</CardDescription>
  </CardHeader>
  <CardContent>
  <div className="space-y-4">
  {products.map((product) => (
  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
  <div>
  <h3 className="font-medium">{product.name}</h3>
  <p className="text-sm text-muted-foreground">₹{product.price.toFixed(2)}</p>
  </div>
  <div className="flex gap-2">
  <Dialog>
  <DialogTrigger asChild>
  <Button
  variant="outline"
  size="icon"
  onClick={() =>
  setEditingProduct({
  id: product.id,
  name: product.name,
  price: product.price.toString(),
  })
  }
  >
  <Pencil className="h-4 w-4" />
  </Button>
  </DialogTrigger>
  <DialogContent>
  <DialogHeader>
  <DialogTitle>Edit Product</DialogTitle>
  <DialogDescription>Make changes to the product details</DialogDescription>
  </DialogHeader>
  {editingProduct && (
  <div className="space-y-4 py-4">
  <div className="space-y-2">
  <Label htmlFor="editProductName">Product Name</Label>
  <Input
  id="editProductName"
  value={editingProduct.name}
  onChange={(e) =>
  setEditingProduct({
  ...editingProduct,
  name: e.target.value,
  })
  }
  />
  </div>
  <div className="space-y-2">
  <Label htmlFor="editProductPrice">Price (₹)</Label>
  <Input
  id="editProductPrice"
  type="number"
  value={editingProduct.price}
  onChange={(e) =>
  setEditingProduct({
  ...editingProduct,
  price: e.target.value,
  })
  }
  />
  </div>
  </div>
  )}
  <DialogFooter>
  <Button onClick={handleUpdateProduct}>Save Changes</Button>
  </DialogFooter>
  </DialogContent>
  </Dialog>
  <Button variant="destructive" size="icon" onClick={() => deleteProduct(product.id)}>
  <Trash2 className="h-4 w-4" />
  </Button>
  </div>
  </div>
  ))}
  </div>
  </CardContent>
  </Card>
  </div>
  </TabsContent>

  <TabsContent value="orders">
  <Card>
  <CardHeader>
  <CardTitle>All Orders</CardTitle>
  <CardDescription>View and manage customer orders</CardDescription>
  </CardHeader>
  <CardContent>
  <div className="space-y-4">
  {orders.length === 0 ? (
  <p className="text-center py-4 text-muted-foreground">No orders yet</p>
  ) : (
  orders.map((order) => (
  <div key={order.id} className="border rounded-lg p-4 space-y-4">
  <div className="flex justify-between items-center">
  <div>
  <h3 className="font-medium">Order #{order.id.slice(-6)}</h3>
  <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
  </div>
  <div className="flex gap-2">
  <select
  className="border rounded p-1 text-sm"
  value={order.status}
  onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
  >
  <option value="pending">Pending</option>
  <option value="completed">Completed</option>
  <option value="cancelled">Cancelled</option>
  </select>
  </div>
  </div>
  <div className="space-y-2">
  {order.items.map((item) => (
  <div key={item.id} className="flex justify-between text-sm">
  <span>
  {item.name} × {item.quantity}
  </span>
  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
  </div>
  ))}
  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
  <span>Total</span>
  <span>₹{order.totalAmount.toFixed(2)}</span>
  </div>
  </div>
  </div>
  ))
  )}
  </div>
  </CardContent>
  </Card>
  </TabsContent>
  </Tabs>
  </main>
  </div>
  // </AuthCheck>
  )
  }
