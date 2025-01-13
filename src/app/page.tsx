import { redirect } from 'next/navigation'
import type { FunctionComponent } from 'react'

export default function Home(): ReturnType<FunctionComponent> {
  redirect('/blog')
}
