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
import { ArrowRight, BookOpen, TerminalSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) ||
    'https://mckj-home.zeabur.app/docs/'

  return (
    <section className='relative z-10 px-6 py-20 md:py-24'>
      <AnimateInView
        className='border-border/60 bg-background mx-auto max-w-6xl overflow-hidden rounded-lg border shadow-sm'
        animation='scale-in'
      >
        <div className='grid gap-0 md:grid-cols-[1fr_340px]'>
          <div className='p-6 md:p-8'>
            <div className='border-border/60 bg-muted/35 text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium'>
              <TerminalSquare className='size-4 text-emerald-500' />
              <span>{t('Base URL')}</span>
              <code className='text-foreground font-mono'>
                https://mckj.zeabur.app/v1
              </code>
            </div>
            <h2 className='max-w-2xl text-2xl leading-tight font-semibold md:text-4xl'>
              {props.isAuthenticated
                ? t('回到控制台，继续管理你的接口密钥')
                : t('准备好把客户端接入名创 AI 中转站了吗？')}
            </h2>
            <p className='text-muted-foreground mt-4 max-w-2xl text-sm leading-7 md:text-base'>
              {props.isAuthenticated
                ? t(
                    '查看用量、创建令牌或进入模型相关页面，继续完成你的接入配置。'
                  )
                : t(
                    '注册后创建 API Key，把上面的接口地址填入客户端，即可开始使用统一 AI 接口。'
                  )}
            </p>
            <div className='mt-7 flex flex-wrap gap-3'>
              {props.isAuthenticated ? (
                <Button
                  className='group rounded-lg'
                  render={<Link to='/dashboard' />}
                >
                  {t('进入控制台')}
                  <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-0.5' />
                </Button>
              ) : (
                <>
                  <Button
                    className='group rounded-lg'
                    render={<Link to='/sign-up' />}
                  >
                    {t('立即注册')}
                    <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-0.5' />
                  </Button>
                  <Button
                    variant='outline'
                    className='rounded-lg'
                    render={<Link to='/sign-in' />}
                  >
                    {t('登录')}
                  </Button>
                </>
              )}
              <Button
                variant='outline'
                className='rounded-lg'
                render={
                  <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
                }
              >
                <BookOpen className='mr-2 size-4' />
                {t('使用文档')}
              </Button>
            </div>
          </div>

          <div className='border-border/60 bg-muted/25 border-t p-6 md:border-t-0 md:border-l md:p-8'>
            <p className='text-muted-foreground mb-4 text-xs font-semibold uppercase'>
              {t('接入清单')}
            </p>
            <div className='space-y-3'>
              {[t('注册账户'), t('创建 API Key'), t('复制 Base URL')].map(
                (item, index) => (
                  <div key={item} className='flex items-center gap-3'>
                    <span className='border-border/60 bg-background flex size-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-semibold'>
                      {index + 1}
                    </span>
                    <span className='text-sm font-medium'>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
