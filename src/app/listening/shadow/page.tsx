import { redirect } from 'next/navigation';

// 迁至 /speaking/shadow。保留路由并永久重定向。
export default function ListeningShadowRedirect() {
  redirect('/speaking/shadow');
}
