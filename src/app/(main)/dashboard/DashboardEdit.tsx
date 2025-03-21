/* eslint-disable prettier/prettier */
import { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { Button, Loading, Toggle, SearchField } from 'react-basics';
import { firstBy } from 'thenby';
import useDashboard, { saveDashboard } from '@/store/dashboard';
import { useMessages, useWebsites } from '@/components/hooks';


const DRAG_ID = 'dashboard-website-ordering';

export function DashboardEdit({ teamId }: { teamId: string }) {
  const settings = useDashboard();
  const { websiteOrder, websiteActive, isEdited } = settings;
  const { formatMessage, labels } = useMessages();
  const [order, setOrder] = useState(websiteOrder || []);
  const [active, setActive] = useState(websiteActive || []);
  const [edited, setEdited] = useState(isEdited);
  const [websites, setWebsites] = useState([]);
  const [search, setSearch] = useState('');
 
  const {
    result,
    query: { isLoading },
    setParams,
  } = useWebsites({ teamId });

  useEffect(() => {
    if (result?.data) {
      setWebsites(prevWebsites => {
        const newWebsites = [...prevWebsites, ...result.data];
        if (newWebsites.length < result.count) {
          setParams(prevParams => ({ ...prevParams, page: prevParams.page + 1 }));
        }
        return newWebsites;
      });
    }
  }, [result]);

  const ordered = useMemo(() => {
    if (websites) {
      return websites
        .map((website: { id: any; name: string; domain: string }) => ({
          ...website,
          order: order.indexOf(website.id),
        }))
        .sort(firstBy('order'));
    }
    return [];
  }, [websites, order]);

  function handleWebsiteDrag({ destination, source }) {
    if (!destination || destination.index === source.index) return;

    const orderedWebsites = [...ordered];
    const [removed] = orderedWebsites.splice(source.index, 1);
    orderedWebsites.splice(destination.index, 0, removed);

    setOrder(orderedWebsites.map(website => website?.id || 0));
    setEdited(true);
  }

  function handleActiveWebsites(id: string) {
    setActive(prevActive =>
      prevActive.includes(id) ? prevActive.filter(a => a !== id) : [...prevActive, id],
    );
    setEdited(true);
  }

  function handleSave() {
    saveDashboard({
      editing: false,
      isEdited: edited,
      websiteOrder: order,
      websiteActive: active,
    });
  }

  function handleCancel() {
    saveDashboard({ editing: false, websiteOrder, websiteActive, isEdited });
  }

  function handleReset() {
    setOrder([]);
    setActive([]);
    setEdited(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5 gap-5">
        <SearchField className="max-w-[360px]" value={search} onSearch={setSearch} />
        <div className="flex items-center justify-end gap-2.5">
          <Button onClick={handleSave} variant="primary" size="sm">
            {formatMessage(labels.save)}
          </Button>
          <Button onClick={handleCancel} size="sm">
            {formatMessage(labels.cancel)}
          </Button>
          <Button onClick={handleReset} size="sm">
            {formatMessage(labels.reset)}
          </Button>
        </div>
      </div>
      <div className="cursor-grab active:cursor-grabbing">
        <DragDropContext onDragEnd={handleWebsiteDrag}>
          <Droppable droppableId={DRAG_ID}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ marginBottom: snapshot.isDraggingOver ? 260 : null }}
              >
                {ordered.map(({ id, name, domain }, index) => {
                  if (
                    search &&
                    !`${name.toLowerCase()}${domain.toLowerCase()}`.includes(search.toLowerCase())
                  ) {
                    return null;
                  }

                  return (
                    <Draggable key={id} draggableId={`${DRAG_ID}-${id}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className={classNames("flex items-center justify-between w-full p-5 rounded border border-[--base400] bg-[--base50] mb-2.5 ", {
                            "border-[var(--base600)] shadow-[4px_4px_4px_var(--base100)]": snapshot.isDragging,
                          })}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className=" relative">
                            <div className="font-semibold text-base">{name}</div>
                            <div className="text-[14px] text-base-700">{domain}</div>
                          </div>
                          <Toggle
                            checked={active.includes(id)}
                            onChange={() => handleActiveWebsites(id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default DashboardEdit;
