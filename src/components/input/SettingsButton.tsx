import { Button, Icon, PopupTrigger, Popup, Form, FormRow } from 'react-basics';
import TimezoneSetting from '@/app/(main)/profile/TimezoneSetting';
import DateRangeSetting from '@/app/(main)/profile/DateRangeSetting';
import Icons from '@/components/icons';
import { useMessages } from '@/components/hooks';

export function SettingsButton() {
  const { formatMessage, labels } = useMessages();

  return (
    <PopupTrigger>
      <Button variant="quiet">
        <Icon>
          <Icons.Gear />
        </Icon>
      </Button>
      <Popup
        className="bg-gray-100 border border-gray-400 rounded-md flex flex-col absolute top-full right-0 p-5"
        position="bottom"
        alignment="end"
      >
        <Form>
          <FormRow label={formatMessage(labels.timezone)}>
            <TimezoneSetting />
          </FormRow>
          <FormRow label={formatMessage(labels.defaultDateRange)}>
            <DateRangeSetting />
          </FormRow>
        </Form>
      </Popup>
    </PopupTrigger>
  );
}

export default SettingsButton;
