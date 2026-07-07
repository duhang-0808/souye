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
import { Link } from '@tanstack/react-router'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Cpu,
  KeyRound,
  LockKeyhole,
  Network,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const FALLBACK_SERVER_ADDRESS = 'https://mckj.zeabur.app'
const LOGO_URL = 'https://mckj-home.zeabur.app/logo.svg?v=20260605-2'
const TECH_VIDEO_URL =
  'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4'

function normalizeServerAddress(status: unknown) {
  const record = status as Record<string, unknown> | null
  const nested = record?.data as Record<string, unknown> | undefined
  const raw =
    record?.server_address ??
    record?.serverAddress ??
    nested?.server_address ??
    nested?.serverAddress

  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/+$/, '')
  }

  return FALLBACK_SERVER_ADDRESS
}

async function copyText(text: string) {
  if (window.navigator.clipboard && window.isSecureContext) {
    await window.navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error('copy failed')
  }
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const [copied, setCopied] = useState(false)

  const serverAddress = normalizeServerAddress(status)
  const baseUrl = `${serverAddress}/v1`
  const consoleUrl = props.isAuthenticated ? '/dashboard' : '/sign-in'
  const docsUrl =
    (status?.docs_link as string | undefined) ||
    'https://mckj-home.zeabur.app/docs/'

  const handleCopy = async () => {
    try {
      await copyText(baseUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className='relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-cyan-500/20 px-6 pt-24 pb-14 md:pt-28'>
      <div className='absolute inset-0 -z-30 bg-[#030711]' />
      <div
        aria-hidden
        className='absolute inset-0 -z-20 opacity-45'
        style={{
          backgroundImage: [
            'linear-gradient(rgba(45, 212, 191, 0.16) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(45, 212, 191, 0.14) 1px, transparent 1px)',
            'linear-gradient(135deg, transparent 0 46%, rgba(59, 130, 246, 0.12) 47% 53%, transparent 54% 100%)',
          ].join(', '),
          backgroundSize: '42px 42px, 42px 42px, 180px 180px',
        }}
      />
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(8,16,28,0.96),rgba(8,16,28,0.15))]'
      />
      <div
        aria-hidden
        className='absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(0deg,rgba(3,7,17,0.96),rgba(3,7,17,0))]'
      />

      <div className='mx-auto grid min-h-[calc(100svh-10rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.1fr_0.9fr]'>
        <div className='relative z-10 max-w-xl'>
          <div
            className='landing-animate-fade-up mb-10 inline-flex items-center gap-3 text-sm font-medium text-slate-200 opacity-0'
            style={{ animationDelay: '0ms' }}
          >
            <span className='flex size-16 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.22)]'>
              <img
                src={LOGO_URL}
                alt='MinC'
                className='size-12 rounded-md object-contain'
              />
            </span>
            <span>{t('AI 大厅')}</span>
            <span className='rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300'>
              {t('在线')}
            </span>
          </div>

          <h1
            className='landing-animate-fade-up text-[clamp(2.35rem,4.4vw,4.15rem)] leading-[1.04] font-semibold text-white opacity-0'
            style={{ animationDelay: '80ms' }}
          >
            <span className='block whitespace-nowrap'>{t('统一入口')}</span>
            <span className='block whitespace-nowrap text-cyan-200'>
              {t('连接所有 AI')}
            </span>
          </h1>

          <p
            className='landing-animate-fade-up mt-8 max-w-lg text-base leading-8 text-slate-300 opacity-0'
            style={{ animationDelay: '160ms' }}
          >
            {t(
              '一个账户接入 AI 工作台、算力资源与模型市场。注册后创建 API Key，把 Base URL 填入客户端即可开始调用。'
            )}
          </p>

          <div
            className='landing-animate-fade-up mt-8 space-y-4 opacity-0'
            style={{ animationDelay: '240ms' }}
          >
            {[
              t('主流大模型统一 API 网关'),
              t('按量计费，调用与额度清晰可查'),
              t('可视化工作台与模型接入文档'),
            ].map((item) => (
              <div key={item} className='flex items-center gap-3 text-sm'>
                <CheckCircle2 className='size-5 shrink-0 text-cyan-300' />
                <span className='font-medium text-slate-200'>{item}</span>
              </div>
            ))}
          </div>

          <div
            className='landing-animate-fade-up mt-16 flex items-center gap-2 text-xs text-slate-400 opacity-0'
            style={{ animationDelay: '320ms' }}
          >
            <ShieldCheck className='size-4 text-cyan-300' />
            <span>{t('企业级安全 · 数据加密传输')}</span>
          </div>
        </div>

        <div className='pointer-events-none relative z-0 mx-auto aspect-square w-full max-w-[560px] lg:-mx-20 lg:translate-x-8 xl:translate-x-12'>
          <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.22),rgba(99,102,241,0.1)_36%,transparent_70%)] blur-3xl' />
          <video
            className='absolute inset-0 h-full w-full scale-110 [mask-image:radial-gradient(circle,black_34%,rgba(0,0,0,0.72)_58%,transparent_76%)] object-cover opacity-70 mix-blend-screen saturate-150'
            src={TECH_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
          />
          <div className='absolute inset-[7%] rounded-full border border-cyan-200/10 bg-[radial-gradient(circle,transparent_47%,rgba(34,211,238,0.08)_48%,transparent_50%)] shadow-[inset_0_0_46px_rgba(34,211,238,0.08)]' />
          <div className='landing-hero-scan absolute inset-[9%] rounded-full' />
          <div className='landing-hero-orbit landing-hero-orbit-slow absolute inset-[8%] rounded-full'>
            <span className='absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]' />
          </div>
          <div className='landing-hero-orbit landing-hero-orbit-fast absolute inset-[19%] rounded-full'>
            <span className='absolute top-[12%] left-[18%] size-2 rounded-full bg-fuchsia-200 shadow-[0_0_18px_rgba(244,114,182,0.72)]' />
          </div>
          <div className='landing-hero-orbit landing-hero-orbit-reverse absolute inset-[30%] rounded-full'>
            <span className='absolute right-[8%] bottom-[18%] size-1.5 rounded-full bg-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.68)]' />
          </div>
          <svg
            aria-hidden
            className='absolute inset-0 h-full w-full overflow-visible opacity-80'
            viewBox='0 0 560 560'
          >
            <defs>
              <linearGradient id='hero-signal-cyan' x1='0' x2='1' y1='0' y2='1'>
                <stop offset='0%' stopColor='rgba(125, 249, 255, 0)' />
                <stop offset='45%' stopColor='rgba(125, 249, 255, 0.9)' />
                <stop offset='100%' stopColor='rgba(167, 139, 250, 0)' />
              </linearGradient>
              <filter id='hero-signal-glow'>
                <feGaussianBlur stdDeviation='3' result='blur' />
                <feMerge>
                  <feMergeNode in='blur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>
            <path
              className='landing-hero-signal landing-hero-signal-a'
              d='M280 280 C213 228 162 167 88 128'
              filter='url(#hero-signal-glow)'
              stroke='url(#hero-signal-cyan)'
            />
            <path
              className='landing-hero-signal landing-hero-signal-b'
              d='M280 280 C356 236 424 226 500 172'
              filter='url(#hero-signal-glow)'
              stroke='url(#hero-signal-cyan)'
            />
            <path
              className='landing-hero-signal landing-hero-signal-c'
              d='M280 280 C215 338 175 398 104 438'
              filter='url(#hero-signal-glow)'
              stroke='url(#hero-signal-cyan)'
            />
            <path
              className='landing-hero-signal landing-hero-signal-d'
              d='M280 280 C355 342 415 370 488 430'
              filter='url(#hero-signal-glow)'
              stroke='url(#hero-signal-cyan)'
            />
            {[
              [88, 128],
              [500, 172],
              [104, 438],
              [488, 430],
            ].map(([cx, cy]) => (
              <g key={`${cx}-${cy}`} className='landing-hero-node'>
                <circle cx={cx} cy={cy} r='14' fill='rgba(8, 18, 30, 0.72)' />
                <circle
                  cx={cx}
                  cy={cy}
                  r='4'
                  fill='rgb(125, 249, 255)'
                  filter='url(#hero-signal-glow)'
                />
              </g>
            ))}
          </svg>
          <div className='absolute inset-[36%] rounded-full border border-cyan-200/20 bg-cyan-200/[0.03] shadow-[0_0_40px_rgba(34,211,238,0.2)]' />
          <Link
            to={consoleUrl}
            aria-label={t('控制台')}
            className='pointer-events-auto absolute top-1/2 left-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-cyan-100/35 bg-slate-950/60 text-cyan-100 shadow-[0_0_70px_rgba(34,211,238,0.32),inset_0_0_34px_rgba(34,211,238,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-100/60 hover:bg-cyan-400/10 hover:shadow-[0_0_86px_rgba(34,211,238,0.42),inset_0_0_38px_rgba(34,211,238,0.16)] focus-visible:ring-2 focus-visible:ring-cyan-200/70 focus-visible:outline-none'
          >
            <div className='absolute inset-2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_45%_30%,rgba(255,255,255,0.16),transparent_34%)]' />
            <div className='landing-hero-core-pulse absolute inset-0 rounded-full' />
            <Network className='relative size-9 drop-shadow-[0_0_12px_rgba(103,232,249,0.9)]' />
            <span className='relative translate-x-0.5 text-center text-xs font-semibold tracking-normal'>
              {t('控制台')}
            </span>
          </Link>
          <div className='absolute top-[24%] left-[13%] rounded-md border border-cyan-200/20 bg-slate-950/45 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-cyan-100/70 shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur'>
            API
          </div>
          <div className='absolute right-[10%] bottom-[27%] rounded-md border border-fuchsia-200/20 bg-slate-950/45 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-fuchsia-100/70 shadow-[0_0_24px_rgba(217,70,239,0.12)] backdrop-blur'>
            GPU
          </div>
        </div>

        <div
          className='landing-animate-fade-up relative z-10 rounded-lg border border-white/12 bg-white/[0.08] p-6 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8'
          style={{ animationDelay: '260ms' }}
        >
          <div className='mb-7 text-center'>
            <p className='text-3xl font-light text-white md:text-4xl'>
              {t('欢迎进入')}
            </p>
            <p className='mt-3 text-sm font-semibold text-slate-300'>
              {t('统一入口管理 AI 工作台、算力资源与模型市场')}
            </p>
          </div>

          <div className='space-y-4'>
            <div className='rounded-lg border border-slate-500/30 bg-slate-800/75 p-4'>
              <div className='mb-2 flex items-center gap-2 text-xs font-medium text-slate-400'>
                <Cpu className='size-4 text-cyan-300' />
                <span>{t('Base URL')}</span>
              </div>
              <code className='block truncate font-mono text-sm font-semibold text-white'>
                {baseUrl}
              </code>
            </div>

            <Button
              type='button'
              onClick={handleCopy}
              className='h-12 w-full rounded-lg border border-white/20 bg-white/90 text-sm font-semibold text-slate-950 shadow-[0_14px_35px_rgba(255,255,255,0.1)] hover:bg-white'
            >
              {copied ? (
                <Check className='mr-2 size-4' />
              ) : (
                <ClipboardCopy className='mr-2 size-4' />
              )}
              {copied ? t('已复制') : t('复制接口地址')}
            </Button>

            {!props.isAuthenticated && (
              <div className='grid grid-cols-2 gap-3'>
                <Button
                  className='h-12 rounded-lg border border-cyan-300/25 bg-cyan-400/15 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/20'
                  render={<Link to='/sign-up' />}
                >
                  {t('创建账号')}
                </Button>
                <Button
                  variant='outline'
                  className='h-12 rounded-lg border-white/15 bg-white/5 text-sm font-semibold text-slate-100 hover:bg-white/10'
                  render={<Link to='/sign-in' />}
                >
                  {t('登录')}
                </Button>
              </div>
            )}

            <Button
              variant='ghost'
              className='h-11 w-full rounded-lg text-slate-300 hover:bg-white/8 hover:text-white'
              render={
                <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
              }
            >
              <BookOpen className='mr-2 size-4' />
              {t('查看接入文档')}
            </Button>
          </div>

          <div className='mt-8 flex items-center justify-center gap-2 text-xs text-slate-400'>
            <LockKeyhole className='size-4 text-cyan-300' />
            <span>{t('OpenAI 兼容 · New API 控制台')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
