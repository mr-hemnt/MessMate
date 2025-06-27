"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Utensils } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const router = useRouter()
  const { items } = useCart()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true")
    setIsAdmin(localStorage.getItem("isAdmin") === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("isAdmin")
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Utensils className="h-6 w-6" />
          <span>MessMate</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
                  
                </Link>
              ) : (
                <>
                  <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4">
                    Products
                  </Link>
                  <Link href="/orders" className="text-sm font-medium hover:underline underline-offset-4">
                    My Orders
                  </Link>
                  <Link href="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {items.length}
                      </span>
                    )}
                  </Link>

              <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
                </>

              )}
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
