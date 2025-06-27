"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthCheckProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function AuthCheck({ children, adminOnly = false }: AuthCheckProps) {
  const router = useRouter()

  // useEffect(() => {
    // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    // const isAdmin = localStorage.getItem("isAdmin") === "true"

    // if (!isAuthenticated) {
      // router.push("/login")
    // } else if (adminOnly && !isAdmin) {
      router.push("/products")
    // }
  // }, [router, adminOnly])

  return <>{children}</>
}
