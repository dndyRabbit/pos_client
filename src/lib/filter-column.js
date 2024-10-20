// import {
//   eq,
//   ilike,
//   inArray,
//   isNotNull,
//   isNull,
//   not,
//   notLike,
// } from "drizzle-orm"

// export function filterColumn({ column, value, isSelectable }) {
//   const [filterValue, filterOperator] = (value?.split("~").filter(Boolean) ?? [])

//   if (!filterValue) return

//   if (isSelectable) {
//     switch (filterOperator) {
//       case "eq":
//         return inArray(column, filterValue.split(".").filter(Boolean) ?? [])
//       case "notEq":
//         return not(inArray(column, filterValue.split(".").filter(Boolean) ?? []))
//       case "isNull":
//         return isNull(column)
//       case "isNotNull":
//         return isNotNull(column)
//       default:
//         return inArray(column, filterValue.split(".") ?? [])
//     }
//   }

//   switch (filterOperator) {
//     case "ilike":
//       return ilike(column, `%${filterValue}%`)
//     case "notIlike":
//       return notLike(column, `%${filterValue}%`)
//     case "startsWith":
//       return ilike(column, `${filterValue}%`)
//     case "endsWith":
//       return ilike(column, `%${filterValue}`)
//     case "eq":
//       return eq(column, filterValue)
//     case "notEq":
//       return not(eq(column, filterValue))
//     case "isNull":
//       return isNull(column)
//     case "isNotNull":
//       return isNotNull(column)
//     default:
//       return ilike(column, `%${filterValue}%`)
//   }
// }
