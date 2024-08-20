'use client'

import { Suspense } from 'react';
import { usePathname, useSearchParams } from "next/navigation"
import Container from "../../styles/Container"
import { categories } from "@/app/utils/Categories"
import Category from "./Category"

const Categories = () => {
  return (
    <div className="bg-white">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesContent />
        </Suspense>
      </Container>
    </div>
  )
}

const CategoriesContent = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if (!isMainPage) return null

  return (
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
      {categories.map(item => (
        <Category
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category === item.label || category === null && item.label === 'All'}
        />
      ))}
    </div>
  )
}

export default Categories