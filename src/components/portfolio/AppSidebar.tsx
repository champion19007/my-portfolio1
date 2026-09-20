"use client";

import { Home, User, FolderCode, Briefcase, Mail, Github, Linkedin, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/site', icon: Home },
    { name: 'About Me', href: '/about', icon: User },
    { name: 'Projects', href: '/projects', icon: FolderCode },
    { name: 'Expertise', href: '/skills', icon: Briefcase },
    { name: 'Offerings', href: '/services', icon: Zap },
    { name: 'Connect', href: '/contact', icon: Mail },
  ];

  return (
    <Sidebar className="border-r border-border/50 shadow-2xl">
      <SidebarHeader className="p-6 border-b border-border/50">
        <Link href="/site" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            S
          </div>
          <span className="text-xl font-black tracking-tighter">
            SYRP<span className="text-primary">.</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        pathname === item.href 
                          ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(255,0,0,0.1)]" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", pathname === item.href && "text-primary")} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
            Presence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="https://github.com/champion19007" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                  <Github className="h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="https://linkedin.com/in/saiyashwantreddy" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-bold text-xs border-2 border-background shadow-xl">
              SY
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black truncate">Sai Yashwant Reddy</p>
              <p className="text-[10px] text-muted-foreground truncate">AI Engineer</p>
            </div>
          </div>
          <Link 
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-primary-foreground rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Hire Me
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
