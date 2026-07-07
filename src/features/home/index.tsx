/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { RichContent } from '@/components/rich-content'
import { isLikelyHtml } from '@/lib/content-format'
import { useAuthStore } from '@/stores/auth-store'

import { CTA, Features, Hero, HowItWorks, Stats } from './components'
import { useHomePageContent } from './hooks'

const MINC_HEADER_PROPS = {
  brandVariant: 'showcase' as const,
  showLogo: false,
  showNavigation: false,
}

function isLegacyMincHomeUrl(content: string) {
  try {
    return new URL(content).hostname === 'mckj-home.zeabur.app'
  } catch {
    return false
  }
}

export function Home() {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { content, isLoaded, isUrl } = useHomePageContent()

  if (!isLoaded) {
    return (
      <PublicLayout
        showMainContainer={false}
        siteName='MINC API'
        headerProps={MINC_HEADER_PROPS}
      >
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground'>{t('Loading...')}</div>
        </main>
      </PublicLayout>
    )
  }

  if (content && !isLegacyMincHomeUrl(content)) {
    if (isUrl) {
      return (
        <PublicLayout
          showMainContainer={false}
          siteName='MINC API'
          headerProps={MINC_HEADER_PROPS}
        >
          <iframe
            src={content}
            className='h-screen w-full border-none'
            title={t('Custom Home Page')}
            sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
          />
        </PublicLayout>
      )
    }

    const contentIsHtml = isLikelyHtml(content)

    if (contentIsHtml) {
      return (
        <PublicLayout
          showMainContainer={false}
          siteName='MINC API'
          headerProps={MINC_HEADER_PROPS}
        >
          <RichContent
            mode='html'
            htmlVariant='isolated'
            content={content}
            className='custom-home-content'
          />
        </PublicLayout>
      )
    }

    return (
      <PublicLayout siteName='MINC API' headerProps={MINC_HEADER_PROPS}>
        <div className='mx-auto max-w-6xl px-4 py-8'>
          <RichContent
            mode='markdown'
            content={content}
            className='custom-home-content'
          />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout
      showMainContainer={false}
      siteName='MINC API'
      headerProps={MINC_HEADER_PROPS}
    >
      <div className='min-h-screen bg-[#030711] text-slate-100 [--background:oklch(0.13_0.028_245)] [--border:oklch(0.34_0.06_230)] [--foreground:oklch(0.95_0.015_235)] [--muted-foreground:oklch(0.72_0.025_235)] [--muted:oklch(0.2_0.035_235)]'>
        <Hero isAuthenticated={isAuthenticated} />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA isAuthenticated={isAuthenticated} />
        <Footer />
      </div>
    </PublicLayout>
  )
}
