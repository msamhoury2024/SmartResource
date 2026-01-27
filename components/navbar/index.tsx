"use client";

import {
  Briefcase,
  Building,
  CircleHelpIcon,
  Handshake,
  Menu,
  NotebookTextIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, ButtonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as React from "react";
import { cn } from "@/lib/utils";
import FullLogoIcon from "../logos/full_logo";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  actions?: { title: string; url: string; variant?: ButtonVariants }[];
}

export const useScrolled = (threshold = 0) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > threshold;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.svg",
    alt: "logo",
    title: "Smart Resource",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Dashboard",
      url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "#",
    },
    { title: "Contact Us", url: "/contact" },
    { title: "Blog", url: "/blog" },
  ],
  actions = [{ title: "Get Started", url: "/#products", variant: "default" }],
}: Navbar1Props) => {
  const renderSubMenuLink = React.useCallback(
    (item: MenuItem) => (
      <a
        key={item.title}
        href={item.url}
        className="hover:bg-muted hover:text-accent-foreground w-full xl:min-w-80 flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      >
        {item.icon && <div className="text-foreground">{item.icon}</div>}
        <div>
          <div className="text-sm font-semibold">{item.title}</div>
          {item.description && (
            <p className="text-muted-foreground text-sm line-clamp-1 leading-snug">
              {item.description}
            </p>
          )}
        </div>
      </a>
    ),
    [menu]
  );

  const renderMenuItem = React.useCallback(
    (item: MenuItem) => {
      if (item.items && item.items.length > 0) {
        return (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-4">
                {item.items.map(renderSubMenuLink)}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }

      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuLink
            href={item.url}
            className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2"
          >
            {item.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    },
    [menu]
  );

  const renderMobileMenuItem = React.useCallback(
    (item: MenuItem) => {
      const hasChildren = item.items && item.items.length > 0;

      if (hasChildren) {
        return (
          <AccordionItem
            key={item.title}
            value={item.title}
            className="border-b-0"
          >
            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="mt-2 flex flex-col gap-2">
              {item.items!.map(renderSubMenuLink)}
            </AccordionContent>
          </AccordionItem>
        );
      }

      return (
        <a
          key={item.title}
          href={item.url}
          className="text-md font-semibold hover:text-primary transition-colors"
        >
          {item.title}
        </a>
      );
    },
    [menu]
  );

  const isScrolled = useScrolled(100);

  return (
    <header
      className={cn(
        "py-4 fixed top-0 left-0 w-full z-50 backdrop-blur-md",
        isScrolled ? "bg-background/60" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex h-8 shrink-0 items-center gap-2">
              {/* <LogoIcon />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span> */}
              <FullLogoIcon className="w-[110px]" />
            </a>

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {menu.map(renderMenuItem)}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2">
            {actions.map((action) => (
              <Button
                asChild
                variant={action.variant}
                size="sm"
                key={action.title}
              >
                <a href={action.url}>{action.title}</a>
              </Button>
            ))}
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <FullLogoIcon className="w-[110px]" />
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>

                  <div className="flex flex-col items-center gap-3">
                    {actions.map((action) => (
                      <Button
                        asChild
                        variant={action.variant}
                        size="sm"
                        key={action.title}
                      >
                        <a href={action.url}>{action.title}</a>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
