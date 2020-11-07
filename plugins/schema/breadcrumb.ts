import type { Plugin } from '@nuxt/types'
import { BreadcrumbItem } from '~/interfaces/BreadcrumbItem'
import { BreadcrumbSchemaArgs } from '~/interfaces/BreadcrumbSchemaArgs'
import { createBreadcrumbSchemaObject } from '~/resources/schema/breadcrumb'

type BreadcrumbSchemaCreator = (breadcrumbItemList: BreadcrumbItem[]) => string

declare module 'vue/types/vue' {
  interface Vue {
    $createBreadcrumbSchema: BreadcrumbSchemaCreator
  }
}

const breadcrumbSchemaCreator: BreadcrumbSchemaCreator = (
  breadcrumbItemList: BreadcrumbItem[]
) => {
  const args: BreadcrumbSchemaArgs = {
    breadcrumbItemList,
  }
  const breadcrumbSchemaObject = createBreadcrumbSchemaObject(args)
  return JSON.stringify(breadcrumbSchemaObject)
}

const breadcrumbSchemaPlugin: Plugin = (_context, inject) => {
  inject('createBreadcrumbSchema', breadcrumbSchemaCreator)
}

export default breadcrumbSchemaPlugin
