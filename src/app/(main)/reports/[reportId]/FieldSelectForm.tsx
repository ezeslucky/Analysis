/* eslint-disable prettier/prettier */
import { Menu, Item, Form, FormRow } from 'react-basics';
import { useMessages } from '@/components/hooks';
import { Key } from 'react';

export interface FieldSelectFormProps {
  fields?: any[];
  onSelect?: (key: any) => void;
  showType?: boolean;
} 

export default function FieldSelectForm({
  fields = [],
  onSelect,
  showType = true,
}: FieldSelectFormProps) {
  const { formatMessage, labels } = useMessages();

  return (
    <Form>
      <FormRow label={formatMessage(labels.fields)}>
        <Menu className="w-[360px] max-h-[300px] overflow-auto" onSelect={key => onSelect(fields[key as any])}>
          {fields.map(({ name, label, type }: any, index: Key) => {
            return (
              <Item key={index} className="flex flex-row justify-between rounded-[var(--border-radius)] hover:bg-[var(--base75)]">
                <div>{label || name}</div>
                {showType && type && <div className="text-gray-300">{type}</div>}
              </Item>
            );
          })}
        </Menu>
      </FormRow>
    </Form>
  );
}
