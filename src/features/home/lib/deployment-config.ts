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
export interface HomeDeploymentConfig {
  apiBaseUrl: string
  consoleUrl: string
  docsUrl: string
  embed: boolean
  logoUrl: string
  serverAddress: string
  signInUrl: string
  signUpUrl: string
}

const DEFAULT_SERVER_ADDRESS = 'https://mckj.zeabur.app'
const DEFAULT_DOCS_URL = 'https://mckj-home.zeabur.app/docs/'
const DEFAULT_LOGO_URL = 'https://mckj-home.zeabur.app/logo.svg?v=20260605-2'

const TRUTHY_VALUES = new Set(['1', 'true', 'yes', 'on'])

function getSearchParams() {
  if (typeof window === 'undefined') {
    return new URLSearchParams()
  }

  return new URLSearchParams(window.location.search)
}

function getParam(params: URLSearchParams, names: string[]) {
  for (const name of names) {
    const value = params.get(name)?.trim()
    if (value) {
      return value
    }
  }

  return undefined
}

function isHttpUrl(value: string | undefined) {
  if (!value) {
    return false
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeServerAddress(value: unknown) {
  if (typeof value !== 'string' || !isHttpUrl(value)) {
    return undefined
  }

  return value.trim().replace(/\/+$/, '').replace(/\/v1$/i, '')
}

function normalizeApiBaseUrl(value: string) {
  return value.trim().replace(/\/+$/, '')
}

function readStatusValue(status: unknown, key: string) {
  const record = status as Record<string, unknown> | null
  const nested = record?.data as Record<string, unknown> | undefined
  const value = record?.[key] ?? nested?.[key]

  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function resolveTargetUrl(value: string | undefined, serverAddress: string) {
  if (!value) {
    return serverAddress
  }

  if (isHttpUrl(value)) {
    return value
  }

  if (value.startsWith('/')) {
    return `${serverAddress}${value}`
  }

  return `${serverAddress}/${value}`
}

export function getHomeDeploymentConfig(
  status: unknown
): HomeDeploymentConfig {
  const params = getSearchParams()
  const statusServerAddress =
    normalizeServerAddress(readStatusValue(status, 'server_address')) ??
    normalizeServerAddress(readStatusValue(status, 'serverAddress'))
  const serverAddress =
    normalizeServerAddress(
      getParam(params, ['server', 'server_url', 'site', 'origin'])
    ) ??
    statusServerAddress ??
    DEFAULT_SERVER_ADDRESS
  const apiBaseUrlParam = getParam(params, [
    'api_base_url',
    'base_url',
    'api',
    'base',
  ])
  const apiBaseUrl = normalizeApiBaseUrl(
    apiBaseUrlParam && isHttpUrl(apiBaseUrlParam)
      ? apiBaseUrlParam
      : `${serverAddress}/v1`
  )
  const docsUrl = resolveTargetUrl(
    getParam(params, ['docs', 'docs_url']) ??
      readStatusValue(status, 'docs_link') ??
      DEFAULT_DOCS_URL,
    serverAddress
  )
  const logoUrl =
    getParam(params, ['logo', 'logo_url']) ??
    readStatusValue(status, 'logo') ??
    DEFAULT_LOGO_URL
  const embedValue = getParam(params, ['embed', 'iframe'])

  return {
    apiBaseUrl,
    consoleUrl: resolveTargetUrl(
      getParam(params, ['console', 'dashboard', 'console_url']) ?? '/dashboard',
      serverAddress
    ),
    docsUrl,
    embed: embedValue ? TRUTHY_VALUES.has(embedValue.toLowerCase()) : false,
    logoUrl,
    serverAddress,
    signInUrl: resolveTargetUrl(
      getParam(params, ['signin', 'sign_in', 'login', 'login_url']) ??
        '/sign-in',
      serverAddress
    ),
    signUpUrl: resolveTargetUrl(
      getParam(params, ['signup', 'sign_up', 'register', 'register_url']) ??
        '/sign-up',
      serverAddress
    ),
  }
}
