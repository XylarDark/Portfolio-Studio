const PENDING_INVITE_KEY = 'ps_pending_invite'

export function getPendingInviteToken(): string | null {
  return sessionStorage.getItem(PENDING_INVITE_KEY)
}

export function setPendingInviteToken(token: string | null) {
  if (token) sessionStorage.setItem(PENDING_INVITE_KEY, token)
  else sessionStorage.removeItem(PENDING_INVITE_KEY)
}
