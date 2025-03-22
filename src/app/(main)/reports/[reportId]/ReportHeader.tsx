/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { Icon, LoadingButton, InlineEditField, useToasts } from 'react-basics';
import { useMessages, useApi, useNavigation, useTeamUrl } from '@/components/hooks';
import { ReportContext } from './Report';
import { REPORT_TYPES } from '@/lib/constants';
import Breadcrumb from '@/components/common/Breadcrumb';

export function ReportHeader({ icon }) {
  const { report, updateReport } = useContext(ReportContext);
  const { formatMessage, labels, messages } = useMessages();
  const { showToast } = useToasts();
  const { router } = useNavigation();
  const { renderTeamUrl } = useTeamUrl();

  const { post, useMutation } = useApi();
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (data: any) => post(`/reports`, data),
  });
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (data: any) => post(`/reports/${data.id}`, data),
  });

  const { name, description, parameters } = report || {};
  const { websiteId, dateRange } = parameters || {};
  const defaultName = formatMessage(labels.untitled);

  const handleSave = async () => {
    if (!report.id) {
      create(report, {
        onSuccess: async ({ id }) => {
          showToast({ message: formatMessage(messages.saved), variant: 'success' });
          router.push(renderTeamUrl(`/reports/${id}`));
        },
      });
    } else {
      update(report, {
        onSuccess: async () => {
          showToast({ message: formatMessage(messages.saved), variant: 'success' });
        },
      });
    }
  };

  const handleNameChange = (name: string) => {
    updateReport({ name: name || defaultName });
  };

  const handleDescriptionChange = (description: string) => {
    updateReport({ description });
  };

  if (!report) {
    return null;
  }

  return (
    <div className="grid grid-cols-[1fr_min-content] items-center row-start-1 row-end-2 col-start-1 col-end-3 my-5">
      <div>
        <div className="text-[11px] font-bold uppercase text-base600">
          <Breadcrumb
            data={[
              { label: formatMessage(labels.reports), url: renderTeamUrl('/reports') },
              {
                label: formatMessage(
                  labels[Object.keys(REPORT_TYPES).find(key => REPORT_TYPES[key] === report?.type)],
                ),
              },
            ]}
          />
        </div>
        <div className="flex flex-row items-center text-2xl font-bold gap-5 h-15">
          <Icon size="lg">{icon}</Icon>
          <InlineEditField
            key={name}
            name="name"
            value={name}
            placeholder={defaultName}
            onCommit={handleNameChange}
          />
        </div>
        <div className="text-[var(--font-color300)] max-w-[500px] h-[30px]">
          <InlineEditField
            key={description}
            name="description"
            value={description}
            placeholder={`+ ${formatMessage(labels.addDescription)}`}
            onCommit={handleDescriptionChange}
          />
        </div>
      </div>
      <div className="items-center  flex">
        <LoadingButton
          variant="primary"
          isLoading={isCreating || isUpdating}
          disabled={!websiteId || !dateRange?.value || !name}
          onClick={handleSave}
        >
          {formatMessage(labels.save)}
        </LoadingButton>
      </div>
    </div>
  );
}

export default ReportHeader;
