export function getGuestId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('tori-guest-id');
  if (!id) {
    id = 'guest_' + crypto.randomUUID();
    localStorage.setItem('tori-guest-id', id);
  }
  return id;
}
