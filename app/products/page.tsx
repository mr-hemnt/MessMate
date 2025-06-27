"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Navbar from "@/components/navbar"
import AuthCheck from "@/components/auth-check"
import { useCart } from "@/lib/cart-context"
import { useProducts } from "@/lib/product-data"

export default function ProductsPage() {
  const router = useRouter()
  const { products } = useProducts()
  const { addItem } = useCart()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true"
    setIsAuthenticated(authStatus)
    if (!authStatus) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    // Clear the authentication state
    localStorage.setItem("isAuthenticated", "false")
    setIsAuthenticated(false)
    // Redirect to login page
    router.push("/login")
    toast.success("You have logged out successfully!")
  }

  if (!isAuthenticated) {
    return null // or loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {/* <Navbar /> */}
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Available Items</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <div className="relative w-full h-64">
                    <Image
                      src={`/${product.image}`}
                      alt={product.name}
                      width={256} // Fixed width
                      height={256} // Fixed height
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-muted-foreground">₹{product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => {
                    addItem(product)
                    toast.success(`${product.name} added to cart!`)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="absolute top-4 right-4 space-x-2">
          <Button size="lg" onClick={() => router.push("/cart")} className="px-8">
            View Cart
          </Button>
          <Button size="lg" onClick={handleLogout} className="px-8">
            Logout
          </Button>
        </div>
      </main>
    </div>
  )
}
