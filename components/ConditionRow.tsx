import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { parseDate, DateValue } from "@internationalized/date";
import { FC } from "react";

interface ConditionRowProps {
  index: number;
  condition: any;
  handleConditionChange: (index: number, field: string, value: any) => void;
  handleRemoveCondition: (index: number) => void;
}

const ConditionRow: FC<ConditionRowProps> = ({
  index,
  condition,
  handleConditionChange,
  handleRemoveCondition,
}) => {
  const conditions = [
    { key: "totalSpending", label: "Total Spending" },
    { key: "visits", label: "Visits" },
    { key: "lastVisit", label: "Last Visit" },
  ];

  const operators = [
    { key: ">", label: ">" },
    { key: "<=", label: "<=" },
    { key: "==", label: "==" },
  ];

  const logics = [
    { key: "AND", label: "AND" },
    { key: "OR", label: "OR" },
  ];

  return (
    <div>
      {index > 0 && (
        <Select
          className="max-w-xs pb-4"
          label="Select Logic"
          value={condition.logic || "AND"}
          onChange={(e) =>
            handleConditionChange(index, "logic", e.target.value)
          }
        >
          {logics.map((logic) => (
            <SelectItem key={logic.key} value={logic.key}>
              {logic.label}
            </SelectItem>
          ))}
        </Select>
      )}

      <div className="grid grid-cols-4 gap-4">
        <Select
          className="max-w-xs"
          label="Select Field"
          value={condition.field}
          onChange={(e) =>
            handleConditionChange(index, "field", e.target.value)
          }
        >
          {conditions.map((cond) => (
            <SelectItem key={cond.key} value={cond.key}>
              {cond.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="max-w-xs"
          label="Select Operator"
          value={condition.operator}
          onChange={(e) =>
            handleConditionChange(index, "operator", e.target.value)
          }
        >
          {operators.map((operator) => (
            <SelectItem key={operator.key} value={operator.key}>
              {operator.label}
            </SelectItem>
          ))}
        </Select>

        {condition.field && (
          <>
            {condition.field === "lastVisit" ? (
              <DatePicker
                className="max-w-[284px]"
                label="Select Date"
                value={condition.value ? parseDate(condition.value) : undefined}
                onChange={(date: DateValue) =>
                  handleConditionChange(index, "value", date.toString())
                }
              />
            ) : (
              <Input
                placeholder="Value"
                type="text"
                value={condition.value}
                onChange={(e) =>
                  handleConditionChange(index, "value", e.target.value)
                }
              />
            )}
          </>
        )}

        <Button
          color="danger"
          size="lg"
          variant="solid"
          onClick={() => handleRemoveCondition(index)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ConditionRow;
