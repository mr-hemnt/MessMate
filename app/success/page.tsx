"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import AuthCheck from "@/components/auth-check"

export default function SuccessPage() {
  return (
    // <AuthCheck>
      <div className="flex flex-col min-h-screen items-center justify-center">
        {/* <Navbar /> */}
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <CardTitle className="text-2xl mt-4">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your order has been placed successfully. You can track your order in the Orders section.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link href="/orders" className="w-full">
                <Button className="w-full">View My Orders</Button>
              </Link>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    // </AuthCheck>
  )
}
