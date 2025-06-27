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
import type { Product } from "./cart-context"

// Initial product data
const initialProducts: Product[] = [
  { id: "1", name: "Potato Chips", price: 20, image: "public/potato-chips.jpg" },
  { id: "2", name: "Cola", price: 35, image: "public/Cola.jpg" },
  { id: "3", name: "Chocolate Bar", price: 25, image: "public/chocolate-bar.jpg" },
  { id: "4", name: "Energy Drink", price: 45, image: "energy-drink.jpg" },
  { id: "5", name: "Cookies", price: 30, image: "" },
  { id: "6", name: "Sandwich", price: 50, image: "sandwich.jpg" },  // No 'public/' prefix
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // localStorage.clear()

    // Clear localStorage on page load to ensure fresh mapping of products
    // localStorage.products.clear()
    
    // Try to get products from localSorage
    const savedProducts = localStorage.getItem("products")
    
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        console.log("Loaded products from localStorage:", parsedProducts) // Log to check
        setProducts(parsedProducts)
      } catch (error) {
        console.error("Failed to parse products from localStorage:", error)
        setProducts(initialProducts)
      }
    } else {
      console.log("No products in localStorage, using initial data.")
      setProducts(initialProducts)
      localStorage.setItem("products", JSON.stringify(initialProducts))
    }
  }, [])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct]
      localStorage.setItem("products", JSON.stringify(updatedProducts)) // Ensure this is updated immediately
      return updatedProducts
    })
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      )
      localStorage.setItem("products", JSON.stringify(updatedProducts)) // Ensure this is updated immediately
      return updatedProducts
    })
  }

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((product) => product.id !== id)
      localStorage.setItem("products", JSON.stringify(updatedProducts)) // Ensure this is updated immediately
      return updatedProducts
    })
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
