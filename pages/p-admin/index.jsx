import AdminLayout from '@/components/templates/AdminPanle/AdminLayout/AdminLayout'
import Index from '@/components/templates/AdminPanle/Index/Index'
import { requireAdmin } from '@/utils/auth/requireAdmin';
import React from 'react'

function index() {
  return (
    <AdminLayout>
      <Index />
    </AdminLayout>
  )
}

export const getServerSideProps = requireAdmin;

export default index
