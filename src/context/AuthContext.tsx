import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { Profile } from '../lib/types'
import { fetchOwnProfile } from '../lib/api'
import { isSupabaseConfigured, requireSupabase } from '../lib/supabase'
import { absoluteAppUrl } from '../lib/urls'

type AuthState = {
  loading: boolean
  session: Session | null
  user: User | null
  profile: Profile | null
  configured: boolean
  refreshProfile: () => Promise<void>
  signInWithGoogle: (redirectTo?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const loadProfile = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setProfile(null)
      return
    }
    try {
      const next = await fetchOwnProfile(userId)
      setProfile(next)
    } catch (err) {
      console.error('Failed to load profile', err)
      setProfile(null)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProfile(null)
      return
    }
    const userId = (await requireSupabase().auth.getUser()).data.user?.id
    await loadProfile(userId)
  }, [loadProfile])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    const client = requireSupabase()
    let mounted = true

    client.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setSession(data.session)
      await loadProfile(data.session?.user?.id)
      if (mounted) setLoading(false)
    })

    // Do not await Supabase calls directly inside this callback — it can deadlock
    // the auth client. Defer profile loads to a microtask/timeout instead.
    const { data: sub } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      window.setTimeout(() => {
        void loadProfile(nextSession?.user?.id).finally(() => {
          if (mounted) setLoading(false)
        })
      }, 0)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signInWithGoogle = useCallback(async (redirectTo?: string) => {
    const client = requireSupabase()
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo ?? absoluteAppUrl('/studio'),
      },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const client = requireSupabase()
    const { error } = await client.auth.signOut()
    if (error) throw error
    setProfile(null)
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      profile,
      configured: isSupabaseConfigured,
      refreshProfile,
      signInWithGoogle,
      signOut,
    }),
    [loading, session, profile, refreshProfile, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
