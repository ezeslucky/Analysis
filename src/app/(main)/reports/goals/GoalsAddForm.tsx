/* eslint-disable prettier/prettier */
import { useMessages } from '@/components/hooks';
import { useState } from 'react';
import { Button, Dropdown, Flexbox, FormRow, Item, TextField } from 'react-basics';

export function GoalsAddForm({
  type: defaultType = 'url',
  value: defaultValue = '',
  property: defaultProperty = '',
  operator: defaultAggregate = null,
  goal: defaultGoal = 10,
  onChange,
}: {
  type?: string;
  value?: string;
  operator?: string;
  property?: string;
  goal?: number;
  onChange?: (step: {
    type: string;
    value: string;
    goal: number;
    operator?: string;
    property?: string;
  }) => void;
}) {
  const [type, setType] = useState(defaultType);
  const [value, setValue] = useState(defaultValue);
  const [operator, setOperator] = useState(defaultAggregate);
  const [property, setProperty] = useState(defaultProperty);
  const [goal, setGoal] = useState(defaultGoal);
  const { formatMessage, labels } = useMessages();

  const items = [
    { label: formatMessage(labels.url), value: 'url' },
    { label: formatMessage(labels.event), value: 'event' },
    { label: formatMessage(labels.eventData), value: 'event-data' },
  ];
  const operators = [
    { label: formatMessage(labels.count), value: 'count' },
    { label: formatMessage(labels.average), value: 'average' },
    { label: formatMessage(labels.sum), value: 'sum' },
  ];
  const isDisabled = !type || !value;

  const handleSave = () => {
    onChange(
      type === 'event-data' ? { type, value, goal, operator, property } : { type, value, goal }
    );
    setValue('');
    setProperty('');
    setGoal(10);
  };

  const handleChange = (e, set) => {
    set(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      handleSave();
    }
  };

  const renderTypeValue = (value: any) => items.find(item => item.value === value)?.label;
  const renderOperatorValue = (value: any) => operators.find(item => item.value === value)?.label;

  return (
    <Flexbox direction="column" gap={10}>
      <FormRow label={formatMessage(defaultValue ? labels.update : labels.add)}>
        <Flexbox gap={10}>
          <Dropdown
            className="w-[140px]"
            items={items}
            value={type}
            renderValue={renderTypeValue}
            onChange={(value: any) => setType(value)}
          >
            {({ value, label }) => <Item key={value}>{label}</Item>}
          </Dropdown>
          <TextField
            className="w-[200px]"
            value={value}
            onChange={e => handleChange(e, setValue)}
            autoFocus
            autoComplete="off"
            onKeyDown={handleKeyDown}
          />
        </Flexbox>
      </FormRow>

      {type === 'event-data' && (
        <FormRow label={formatMessage(labels.property)}>
          <Flexbox gap={10}>
            <Dropdown
              className="w-[140px]"
              items={operators}
              value={operator}
              renderValue={renderOperatorValue}
              onChange={(value: any) => setOperator(value)}
            >
              {({ value, label }) => <Item key={value}>{label}</Item>}
            </Dropdown>
            <TextField
              className="w-[200px]"
              value={property}
              onChange={e => handleChange(e, setProperty)}
              autoFocus
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </Flexbox>
        </FormRow>
      )}

      <FormRow label={formatMessage(labels.goal)}>
        <Flexbox gap={10}>
          <TextField
            className="w-[200px]"
            value={goal?.toString()}
            onChange={e => handleChange(e, setGoal)}
            autoComplete="off"
            onKeyDown={handleKeyDown}
          />
        </Flexbox>
      </FormRow>

      <FormRow>
        <Button variant="primary" onClick={handleSave} disabled={isDisabled}>
          {formatMessage(defaultValue ? labels.update : labels.add)}
        </Button>
      </FormRow>
    </Flexbox>
  );
}

export default GoalsAddForm;
