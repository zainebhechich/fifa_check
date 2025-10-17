"use client"

// PHASE 1 i18n fix: switched alias imports to relative for stability
import { useState } from "react"
import { LanguageToggle } from "./components/language-toggle" // placeholder to keep position
import { useTranslations, useLocale } from 'next-intl'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizable-navbar"

export default function WallahWeCanNavbar() {
  const t = useTranslations('Navigation')
  const locale = useLocale()
  const withLocale = (path: string) => `/${locale}${path.startsWith('/') ? '' : '/'}${path.replace(/^\/+/, '')}`

  const navItems = [
    { name: t('about'), link: withLocale("/a-propos") },
    {
      name: t('projects'),
      link: withLocale("/projects"),
      subItems: [
        { name: t('greenSchool'), link: withLocale("/projects/green-school") }, // PHASE 1 i18n fix
        { name: t('kidChen'), link: withLocale("/projects/kid-chen") }, // PHASE 1 i18n fix
        { name: t('ecolibree'), link: withLocale("/projects/ecolibree") }, // PHASE 1 i18n fix
        { name: t('worldWideProject'), link: withLocale("/projects/world-wide-project") }, // PHASE 1 i18n fix
      ],
    },
    {
      name: t('adventure'), // PHASE 1 i18n fix
      link: withLocale("/events"),
      subItems: [
        { name: t('media'), link: withLocale("/events/media") }, // PHASE 1 i18n fix
        { name: t('events'), link: withLocale("/evenements") }, // PHASE 1 i18n fix
      ],
    },
    {
      name: t('getInvolved'),
      link: withLocale("/get-involved"),
      subItems: [
        { name: t('join'), link: withLocale("/adherer") }, // PHASE 1 i18n fix
        { name: t('internship'), link: withLocale("/stage") }, // PHASE 1 i18n fix
      ],
    },
    { name: t('contact'), link: withLocale("/contact") },
    { name: t('transparency'), link: withLocale("/transparency") }, // PHASE 1 i18n fix
  ]

  // Split nav items for the new layout
  const navItemsLeft = navItems.slice(0, 3)
  const navItemsRight = navItems.slice(3, 6)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="relative z-50 w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* Left group: Boutique button + Language Switcher */}
          <div className="flex items-center gap-2">
            <NavbarButton href={withLocale("/shop")} variant="secondary">
              {t('shop')}
            </NavbarButton>
            <LanguageToggle />
          </div>

          {/* Center group: Left Nav Items + Logo + Right Nav Items */}
          <div className="flex flex-1 items-center justify-center gap-4">
            <NavItems items={navItemsLeft} className="flex-1 justify-end" />
            <NavbarLogo />
            <NavItems items={navItemsRight} className="flex-1 justify-start" />
          </div>

          {/* Right group: Faire un don button only */}
          <div className="flex items-center gap-2">
            <NavbarButton href={withLocale("/faire-un-don")} variant="primary">
              {t('donate')}
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <MobileNavToggle isOpen={isMobileMenuOpen} onClickAction={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onCloseAction={closeMobileMenu} items={navItems}>
            <NavbarButton onClick={closeMobileMenu} href={withLocale("/shop")} variant="secondary" className="w-full">
              {t('shop')}
            </NavbarButton>
            <NavbarButton onClick={closeMobileMenu} href={withLocale("/faire-un-don")} variant="primary" className="w-full">
              {t('donate')}
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
