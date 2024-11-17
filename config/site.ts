export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Xeno Mini CRM",
  description: "Mini CRM",
  navItems: [
    {
      label: "Audience",
      href: "/audience",
    },
    {
      label: "Campaigns",
      href: "/campaigns",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
