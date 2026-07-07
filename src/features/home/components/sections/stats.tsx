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
import { Megaphone, ServerCog } from 'lucide-react'
import { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const { end, suffix = '', prefix = '', duration = 1200, decimals = 0 } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals]
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

interface StatsProps {
  className?: string
}

interface StatItem {
  end: number
  suffix: string
  label: string
  helper: string
}

export function Stats(_props: StatsProps) {
  const { t } = useTranslation()

  const stats: StatItem[] = [
    {
      end: 1,
      suffix: '',
      label: t('统一接口地址'),
      helper: t('Base URL 固定清晰'),
    },
    {
      end: 3,
      suffix: ' 步',
      label: t('完成接入'),
      helper: t('注册、建 Key、填地址'),
    },
    {
      end: 5,
      suffix: ' 分钟',
      label: t('开始调用'),
      helper: t('适合新用户快速上手'),
    },
    {
      end: 24,
      suffix: '/7',
      label: t('在线服务'),
      helper: t('作为常用客户端入口'),
    },
  ]

  return (
    <section
      id='announcements'
      className='border-border/40 bg-muted/10 relative z-10 border-b px-6 py-10'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='border-border/60 bg-background/80 mb-8 rounded-lg border p-4 shadow-sm backdrop-blur'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='flex min-w-0 items-start gap-3'>
              <div className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                <Megaphone className='size-4' />
              </div>
              <div className='min-w-0'>
                <p className='text-sm font-semibold'>{t('名创 minc 已上线')}</p>
                <p className='text-muted-foreground mt-1 text-sm leading-6'>
                  {t(
                    '当前支持 OpenAI 兼容接口。请在令牌管理中创建 API Key，并使用 /v1 接口地址作为客户端 Base URL。'
                  )}
                </p>
              </div>
            </div>
            <div className='border-border/60 bg-muted/40 text-muted-foreground inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium'>
              <ServerCog className='size-4 text-sky-500' />
              <span>{t('New API 控制台同步公告')}</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          {stats.map((s) => (
            <div
              key={s.label}
              className='border-border/60 bg-background/80 rounded-lg border p-4 shadow-sm backdrop-blur'
            >
              <span className='block text-2xl font-semibold md:text-3xl'>
                <Counter end={s.end} suffix={s.suffix} />
              </span>
              <span className='mt-2 block text-sm font-medium'>{s.label}</span>
              <span className='text-muted-foreground mt-1 block text-xs leading-5'>
                {s.helper}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
