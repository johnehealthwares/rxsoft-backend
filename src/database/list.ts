


import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

type ListQuery = {
  page?: number
  limit?: number
  filters?: Record<string, any>
}

type ListResult<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  meta: any
}



export function applyFilters(
  qb: SelectQueryBuilder<any>,
  alias: string,
  filters: Record<string, any>
) {
  Object.entries(filters).forEach(([field, raw]) => {
    if (!raw) return
    const { type, value, valueTo } = parseFilter(raw)
    applyFilter(qb, alias, field, type, value, valueTo)
  })
}

function parseFilter(raw: string) {
  const [type, value, valueTo] = raw.split('|')

  return {
    type,
    value,
    valueTo,
  }
}

function resolveField(alias: string, field: string) {
  return field.includes('.') ? field : `${alias}.${field}`
}

function paramName(field: string, type: string) {
  return `${field.replace('.', '_')}_${type}_${Date.now()}`
}

export function applyFilter(
  qb: SelectQueryBuilder<any>,
  alias: string,
  field: string,
  type: string,
  value?: any,
  valueTo?: any
) {
  const column = resolveField(alias, field)
  const param = paramName(field, type)

  switch (type) {
    case 'EQUALS':
      qb.andWhere(`${column} = :${param}`, { [param]: value })
      break

    case 'NOT_EQUALS':
      qb.andWhere(`${column} != :${param}`, { [param]: value })
      break

    case 'CONTAINS':
       qb.andWhere(`${column} LIKE :${param}`, {
        [param]: `%${value}%`,
      })
      break
    case 'FUZZY_MATCH':
      qb.andWhere(`${column} ILIKE :${param}`, {
        [param]: `%${value}%`,
      })
      break

    case 'GREATER_THAN':
      qb.andWhere(`${column} > :${param}`, { [param]: value })
      break

    case 'GREATER_THAN_OR_EQUAL':
      qb.andWhere(`${column} >= :${param}`, { [param]: value })
      break

    case 'LESS_THAN':
      qb.andWhere(`${column} < :${param}`, { [param]: value })
      break

    case 'LESS_THAN_OR_EQUAL':
      qb.andWhere(`${column} <= :${param}`, { [param]: value })
      break
    case 'TODAY': //TODO: Implemennt defautls if not sent
    case 'YESTERDAY':
    case 'TOMMORROW':
    case 'NEXT_24_HOURS': 
    case 'THIS_MONTH':
    case 'LAST_MONTH':
    case 'NEXT_MONTH':
    case 'BETWEEN': {
      const from = `${param}_from`
      const to = `${param}_to`

      qb.andWhere(`${column} BETWEEN :${from} AND :${to}`, {
        [from]: value,
        [to]: valueTo,
      });
      break
    }

    case 'MISSING':
      qb.andWhere(`${column} IS NULL`)
      break
  }
}