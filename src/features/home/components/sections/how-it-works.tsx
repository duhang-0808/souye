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
import { ArrowRight, KeyRound, Settings2, UserRoundPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { useStatus } from '@/hooks/use-status'

import { getHomeDeploymentConfig } from '../../lib/deployment-config'

export function HowItWorks() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const deployment = getHomeDeploymentConfig(status)

  const steps = [
    {
      num: '01',
      title: t('注册账号'),
      desc: t('使用邮箱创建账户，进入 New API 控制台。'),
      icon: <UserRoundPlus className='size-5' strokeWidth={1.8} />,
      cta: t('去注册'),
      href: deployment.signUpUrl,
    },
    {
      num: '02',
      title: t('创建 API Key'),
      desc: t('在令牌管理里新建密钥，复制后妥善保存。'),
      icon: <KeyRound className='size-5' strokeWidth={1.8} />,
      cta: t('进入控制台'),
      href: deployment.consoleUrl,
    },
    {
      num: '03',
      title: t('填写 Base URL'),
      desc: t('把 /v1 接口地址填入客户端，选择模型后开始调用。'),
      icon: <Settings2 className='size-5' strokeWidth={1.8} />,
      cta: t('查看文档'),
      href: deployment.docsUrl,
    },
  ]

  return (
    <section className='border-border/40 bg-muted/10 relative z-10 border-y px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-muted-foreground mb-3 text-xs font-semibold uppercase'>
              {t('接入流程')}
            </p>
            <h2 className='text-2xl font-semibold md:text-4xl'>
              {t('三步开始使用')}
            </h2>
          </div>
          <p className='text-muted-foreground max-w-md text-sm leading-7'>
            {t('从注册到第一次调用，路径尽量短；遇到问题再回到文档核对参数。')}
          </p>
        </AnimateInView>

        <div className='grid gap-3 md:grid-cols-3'>
          {steps.map((step, index) => (
            <AnimateInView
              key={step.num}
              delay={index * 100}
              animation='fade-up'
              className='border-border/60 bg-background rounded-lg border p-5 shadow-sm'
            >
              <div className='mb-8 flex items-center justify-between'>
                <span className='text-muted-foreground font-mono text-xs font-semibold'>
                  STEP {step.num}
                </span>
                <div className='border-border/60 bg-muted/30 text-muted-foreground flex size-10 items-center justify-center rounded-lg border'>
                  {step.icon}
                </div>
              </div>
              <h3 className='text-lg font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground mt-2 min-h-[3rem] text-sm leading-6'>
                {step.desc}
              </p>
              <a
                href={step.href}
                className='text-foreground mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-sky-600'
              >
                {step.cta}
                <ArrowRight className='size-4' />
              </a>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
