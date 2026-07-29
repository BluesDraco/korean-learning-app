import { redirect } from 'next/navigation';

// 迁至 /speaking/say。保留路由并永久重定向。
export default function ListeningSpeakingRedirect() {
  redirect('/speaking/say');
}
