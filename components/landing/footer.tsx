import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

const links = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-lg font-bold">
              KRBI
            </Link>
            <p className="text-sm text-muted-foreground">
              KPI & BI reporting for teams that move fast.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <p className="mb-3 text-sm font-semibold">{col}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KRBI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
