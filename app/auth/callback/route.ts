import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }

        const failure = new URLSearchParams({ error: 'server_error' })
        if (error.message) failure.set('error_description', error.message)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?${failure}`)
    }

    const failure = new URLSearchParams()
    const error = searchParams.get('error')
    const errorCode = searchParams.get('error_code')
    const errorDescription = searchParams.get('error_description')
    if (error) failure.set('error', error)
    if (errorCode) failure.set('error_code', errorCode)
    if (errorDescription) failure.set('error_description', errorDescription)

    const query = failure.toString()
    return NextResponse.redirect(`${origin}/auth/auth-code-error${query ? `?${query}` : ''}`)
}
