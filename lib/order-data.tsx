"use client"

import { useState, useEffect } from "react"
import type { Product } from "./cart-context"

export interface OrderItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Try to get orders from localStorage
    const savedOrders = localStorage.getItem("orders")

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error)
        setOrders([])
      }
    }
  }, [])

  const addOrder = (items: OrderItem[], totalAmount: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      totalAmount,
      date: new Date().toISOString(),
      status: "pending",
    }

    setOrders((prevOrders) => {
      const updatedOrders = [newOrder, ...prevOrders]
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      return updatedOrders
    })

    return newOrder
  }

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => (order.id === id ? { ...order, status } : order))
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      return updatedOrders
    })
  }

  return {
    orders,
    addOrder,
    updateOrderStatus,
  }
}
