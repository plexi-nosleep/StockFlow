import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AppShell } from "@/components/app-shell";
export const metadata:Metadata={title:"StockFlow — Inventory that flows",description:"A clear view of your inventory, orders and business."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><StoreProvider><AppShell>{children}</AppShell></StoreProvider></body></html>}
