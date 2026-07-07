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
import {
  Activity,
  BadgeCheck,
  BookOpenText,
  Cable,
  Gauge,
  KeyRound,
  Route,
  WalletCards,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
}

type Tone = 'emerald' | 'sky' | 'amber' | 'rose'

const toneClasses: Record<Tone, string> = {
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600',
  sky: 'border-sky-500/25 bg-sky-500/10 text-sky-600',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-600',
  rose: 'border-rose-500/25 bg-rose-500/10 text-rose-600',
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const primaryFeatures = [
    {
      title: t('按 OpenAI 兼容方式接入'),
      desc: t('常见客户端只需要改 Base URL 与 API Key，迁移成本低。'),
      icon: <Cable className='size-5' />,
      tone: 'emerald' as const,
      items: ['Chat Completions', 'Responses', 'Embeddings'],
    },
    {
      title: t('令牌集中管理'),
      desc: t('注册后在控制台创建和保存密钥，后续可按需停用或更换。'),
      icon: <KeyRound className='size-5' />,
      tone: 'sky' as const,
      items: [t('创建密钥'), t('复制使用'), t('安全保存')],
    },
    {
      title: t('调用情况可追踪'),
      desc: t('通过 New API 控制台查看用量、日志和账户额度。'),
      icon: <Activity className='size-5' />,
      tone: 'amber' as const,
      items: [t('用量'), t('日志'), t('额度')],
    },
    {
      title: t('为常用工具准备'),
      desc: t(
        '适合 Cherry Studio、Lobe Chat、OpenCat、Codex、Claude Code 等工作流。'
      ),
      icon: <BadgeCheck className='size-5' />,
      tone: 'rose' as const,
      items: ['Cherry Studio', 'Lobe Chat', 'Codex'],
    },
  ]

  const supportItems = [
    {
      icon: <Route className='size-4' />,
      title: t('统一路由'),
      desc: t('让不同客户端使用同一个入口。'),
    },
    {
      icon: <Gauge className='size-4' />,
      title: t('响应体验'),
      desc: t('减少配置摩擦，快速进入调用。'),
    },
    {
      icon: <WalletCards className='size-4' />,
      title: t('额度清晰'),
      desc: t('账户余额和消耗更容易核对。'),
    },
    {
      icon: <BookOpenText className='size-4' />,
      title: t('文档入口'),
      desc: t('接入说明与更新集中展示。'),
    },
  ]

  return (
    <section id='connect' className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-semibold uppercase'>
            {t('模型接入')}
          </p>
          <h2 className='text-2xl leading-tight font-semibold md:text-4xl'>
            {t('把“配置接口”这件事变简单')}
          </h2>
          <p className='text-muted-foreground mt-4 text-sm leading-7 md:text-base'>
            {t(
              '首页只保留用户最需要的信息：地址、密钥、文档和控制台。进入后再处理更细的模型、计费和日志管理。'
            )}
          </p>
        </AnimateInView>

        <div className='grid gap-3 md:grid-cols-2'>
          {primaryFeatures.map((feature, index) => (
            <AnimateInView
              key={feature.title}
              delay={index * 80}
              animation='fade-up'
              className='border-border/60 bg-background hover:bg-muted/25 rounded-lg border p-5 shadow-sm transition-colors'
            >
              <div className='mb-4 flex items-start justify-between gap-4'>
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${toneClasses[feature.tone]}`}
                >
                  {feature.icon}
                </div>
                <div className='flex flex-wrap justify-end gap-1.5'>
                  {feature.items.map((item) => (
                    <span
                      key={item}
                      className='border-border/60 bg-muted/40 text-muted-foreground rounded-md border px-2 py-1 text-[11px] font-medium'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className='text-base font-semibold'>{feature.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {feature.desc}
              </p>
            </AnimateInView>
          ))}
        </div>

        <div className='mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {supportItems.map((item, index) => (
            <AnimateInView
              key={item.title}
              delay={index * 70}
              animation='fade-up'
              className='border-border/50 bg-muted/15 rounded-lg border p-4'
            >
              <div className='border-border/60 bg-background text-muted-foreground mb-3 flex size-8 items-center justify-center rounded-lg border'>
                {item.icon}
              </div>
              <h3 className='text-sm font-semibold'>{item.title}</h3>
              <p className='text-muted-foreground mt-1.5 text-xs leading-5'>
                {item.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
