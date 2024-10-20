import { MixIcon, SquareIcon } from "@radix-ui/react-icons"

export const dataTableConfig = {
  comparisonOperators: [
    { label: "Contains", value: "ilike"},
    { label: "Does not contain", value: "notIlike"},
    { label: "Is", value: "eq"},
    { label: "Is not", value: "notEq"},
    { label: "Starts with", value: "startsWith"},
    { label: "Ends with", value: "endsWith"},
    { label: "Is empty", value: "isNull"},
    { label: "Is not empty", value: "isNotNull"},
  ],
  selectableOperators: [
    { label: "Is", value: "eq"},
    { label: "Is not", value: "notEq"},
    { label: "Is empty", value: "isNull"},
    { label: "Is not empty", value: "isNotNull"},
  ],
  logicalOperators: [
    {
      label: "And",
      value: "and",
      description: "All conditions must be met",
    },
    {
      label: "Or",
      value: "or",
      description: "At least one condition must be met",
    },
  ],
  featureFlags: [
    {
      label: "Advanced filter",
      value: "advancedFilter",
      icon: MixIcon,
      tooltipTitle: "Toggle advanced filter",
      tooltipDescription: "A notion like query builder to filter rows.",
    },
    {
      label: "Floating bar",
      value: "floatingBar",
      icon: SquareIcon,
      tooltipTitle: "Toggle floating bar",
      tooltipDescription: "A floating bar that sticks to the top of the table.",
    },
  ],
}
