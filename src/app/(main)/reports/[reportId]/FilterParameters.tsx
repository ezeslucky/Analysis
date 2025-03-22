/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { useMessages, useFormat, useFilters, useFields } from '@/components/hooks';
import Icons from '@/components/icons';
import { Button, FormRow, Icon, Popup, PopupTrigger } from 'react-basics';
import FilterSelectForm from '../[reportId]/FilterSelectForm';
import ParameterList from '../[reportId]/ParameterList';
import PopupForm from '../[reportId]/PopupForm';
import { ReportContext } from './Report';
import FieldFilterEditForm from '../[reportId]/FieldFilterEditForm';
import { isSearchOperator } from '@/lib/params';


export function FilterParameters() {
  const { report, updateReport } = useContext(ReportContext);
  const { formatMessage, labels } = useMessages();
  const { formatValue } = useFormat();
  const { parameters } = report || {};
  const { websiteId, filters, dateRange } = parameters || {};
  const { fields } = useFields();

  const handleAdd = (value: { name: any }) => {
    if (!filters.find(({ name }) => name === value.name)) {
      updateReport({ parameters: { filters: filters.concat(value) } });
    }
  };

  const handleRemove = (name: string) => {
    updateReport({ parameters: { filters: filters.filter(f => f.name !== name) } });
  };

  const handleChange = (close: () => void, filter: { name: any }) => {
    updateReport({
      parameters: {
        filters: filters.map(f => {
          if (filter.name === f.name) {
            return filter;
          }
          return f;
        }),
      },
    });
    close();
  };

  const AddButton = () => {
    return (
      <PopupTrigger>
        <Button size="sm">
          <Icon>
            <Icons.Plus />
          </Icon>
        </Button>
        <Popup position="bottom" alignment="start">
          <PopupForm>
            <FilterSelectForm
              websiteId={websiteId}
              fields={fields.filter(({ name }) => !filters.find(f => f.name === name))}
              startDate={dateRange?.startDate}
              endDate={dateRange?.endDate}
              onChange={handleAdd}
            />
          </PopupForm>
        </Popup>
      </PopupTrigger>
    );
  };

  return (
    <FormRow label={formatMessage(labels.filters)} action={<AddButton />}>
      <ParameterList>
        {filters.map(
          ({ name, operator, value }: { name: string; operator: string; value: string }) => {
            const label = fields.find(f => f.name === name)?.label;
            const isSearch = isSearchOperator(operator);

            return (
              <ParameterList.Item key={name} onRemove={() => handleRemove(name)}>
                <FilterParameter
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  websiteId={websiteId}
                  name={name}
                  label={label}
                  operator={operator}
                  value={isSearch ? value : formatValue(value, name)}
                  onChange={handleChange}
                />
              </ParameterList.Item>
            );
          },
        )}
      </ParameterList>
    </FormRow>
  );
}

const FilterParameter = ({
  websiteId,
  name,
  label,
  operator,
  value,
  type = 'string',
  startDate,
  endDate,
  onChange,
}) => {
  const { operatorLabels } = useFilters();

  return (
    <PopupTrigger>
      <div className="flex items-center flex-wrap gap-2 overflow-hidden">
        <div className="text-base-800 border border-base-300 font-black px-2 py-1 rounded whitespace-nowrap">{label}</div>
        <div className="text-blue-900 bg-blue-100 text-[12px] font-black px-2 py-0.5 rounded text-uppercase whitespace-nowrap">{operatorLabels[operator]}</div>
        <div className="text-gray-900 bg-gray-100 font-black px-2 py-0.5 rounded whitespace-nowrap">{value}</div>
      </div>
      <Popup className=" mt-5" alignment="start">
        {(close: any) => (
          <PopupForm>
            <FieldFilterEditForm
              websiteId={websiteId}
              name={name}
              label={label}
              type={type}
              startDate={startDate}
              endDate={endDate}
              operator={operator}
              defaultValue={value}
              onChange={onChange.bind(null, close)}
            />
          </PopupForm>
        )}
      </Popup>
    </PopupTrigger>
  );
};

export default FilterParameters;
