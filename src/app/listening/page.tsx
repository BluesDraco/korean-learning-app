import { redirect } from 'next/navigation';

// 板块已改名「口语练习」,路由迁至 /speaking。此处保留路由并永久重定向,避免破坏旧书签。
export default function ListeningRedirect() {
  redirect('/speaking');
}
