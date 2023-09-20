"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
    const supabase = createClientComponentClient()
    const router = useRouter()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div onClick={handleSignOut}>LogoutButton</div>
  )
}

export default LogoutButton