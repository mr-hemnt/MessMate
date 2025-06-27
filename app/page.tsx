import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee, ShoppingBag, Utensils } from "lucide-react"

export default function LandingPage() {
  return (
    <>
      <header className="border-b">
        <div className=" flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Utensils className="h-6 w-6" />
            <span>MessMate</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>
    <div className="flex flex-col min-h-screen items-center justify-center ">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to MessMate
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your one-stop solution for mess management. Order food, track expenses, and enjoy hassle-free dining.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button className="px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="px-8">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to manage your mess efficiently
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <ShoppingBag className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Ordering</h3>
                <p className="text-muted-foreground text-center">
                  Browse through a variety of food items and order with just a few clicks
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <Coffee className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Snacks & Beverages</h3>
                <p className="text-muted-foreground text-center">
                  From chips to cold drinks, we've got all your favorite snacks covered
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <Utensils className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Track Orders</h3>
                <p className="text-muted-foreground text-center">
                  Keep track of all your orders and expenses in one place
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Don't just take our word for it
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <p className="text-muted-foreground">
                  "MessMate has made ordering food in our college mess so much easier. No more waiting in long queues!"
                </p>
                <p className="font-semibold">- Rahul S.</p>
              </div>
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <p className="text-muted-foreground">
                  "I love how I can track all my orders and expenses. Makes budgeting so much simpler."
                </p>
                <p className="font-semibold">- Priya M.</p>
              </div>
              <div className="flex flex-col space-y-2 border rounded-lg p-6 bg-background">
                <p className="text-muted-foreground">
                  "As a mess admin, managing inventory and orders has never been easier. Highly recommended!"
                </p>
                <p className="font-semibold">- Amit K.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            <span className="font-bold">MessMate</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MessMate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
