import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="py-12 md:py-16 px-2 sm:px-8 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Brand and Social Links */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-bold">EdTech</h2>
              </Link>
              <p className="text-muted-foreground">
                This is my project.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="#"
                className="rounded-lg p-2 hover:bg-accent"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                to="#"
                className="rounded-lg p-2 hover:bg-accent"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </Link>
              <Link
                to="#"
                className="rounded-lg p-2 hover:bg-accent"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                to="#"
                className="rounded-lg p-2 hover:bg-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  to="/resources"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Resources
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
                {/* <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Team
                </Link> */}
                <Link
                  to="/blogs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blogs
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">Subscribe to our newsletter</p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Email"
                className="flex-1"
                aria-label="Email address"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-sm text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link
                to="/privacy-policy"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Project © All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with{" "}
            <span role="img" aria-label="heart" className="text-red-500">
              ❤️
            </span>{" "}
            by 8TEN11
          </p>
        </div>
      </div>
    </footer>
  );
}