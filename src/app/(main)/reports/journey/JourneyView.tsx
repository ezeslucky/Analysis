/* eslint-disable prettier/prettier */
import { useContext, useMemo, useState } from 'react';
import { TextOverflow, TooltipPopup } from 'react-basics';
import { firstBy } from 'thenby';
import classNames from 'classnames';
import { useEscapeKey, useMessages } from '@/components/hooks';
import { objectToArray } from '@/lib/data';
import { ReportContext } from '../[reportId]/Report';
import { formatLongNumber } from '@/lib/format';

const NODE_HEIGHT = 60;
const NODE_GAP = 10;
const LINE_WIDTH = 3;

export default function JourneyView() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const { report } = useContext(ReportContext);
  const { data, parameters } = report || {};
  const { formatMessage, labels } = useMessages();

  useEscapeKey(() => setSelectedNode(null));

  const columns = useMemo(() => {
    if (!data) {
      return [];
    }

    const selectedPaths = selectedNode?.paths ?? [];
    const activePaths = activeNode?.paths ?? [];
    const columns = [];

    for (let columnIndex = 0; columnIndex < +parameters.steps; columnIndex++) {
      const nodes = {};

      data.forEach(({ items, count }: any, nodeIndex: any) => {
        const name = items[columnIndex];

        if (name) {
          const selected = !!selectedPaths.find(({ items }) => items[columnIndex] === name);
          const active = selected && !!activePaths.find(({ items }) => items[columnIndex] === name);

          if (!nodes[name]) {
            const paths = data.filter(({ items }) => items[columnIndex] === name);

            nodes[name] = {
              name,
              count,
              totalCount: count,
              nodeIndex,
              columnIndex,
              selected,
              active,
              paths,
              pathMap: paths.map(({ items, count }) => ({
                [`${columnIndex}:${items.join(':')}`]: count,
              })),
            };
          } else {
            nodes[name].totalCount += count;
          }
        }
      });

      columns.push({
        nodes: objectToArray(nodes).sort(firstBy('total', -1)),
      });
    }

    return columns;
  }, [data, selectedNode, activeNode]);

  const handleClick = (name: string, columnIndex: number, paths: any[]) => {
    if (name !== selectedNode?.name || columnIndex !== selectedNode?.columnIndex) {
      setSelectedNode({ name, columnIndex, paths });
    } else {
      setSelectedNode(null);
    }
    setActiveNode(null);
  };

  if (!data) {
    return null;
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 flex flex-nowrap overflow-auto gap-[100px] pr-5">
        {columns.map((column, columnIndex) => {
          return (
            <div key={columnIndex} className="flex flex-col">
              <div className="mb-5">
                <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] text-[16px] font-bold text-base100 bg-base800 z-10 mx-auto mb-5">
                  {columnIndex + 1}
                </div>
                <div className="flex items-center justify-center gap-5 w-full h-10">
                  <div className="font-semibold text-[16px] lowercase" title={column.visitorCount}>
                    {formatLongNumber(column.visitorCount)} {formatMessage(labels.visitors)}
                  </div>
                  {columnIndex > 0 && (
                    <div className="font-semibold text-blue800 bg-blue100 px-2 py-1 rounded-md">
                      {~~column.dropOff}%
                    </div>
                  )}
                </div>
              </div>
              <div className="relative flex flex-col h-full">
                {column.nodes.map(({ name, totalCount, selected, active, paths }) => {
                  return (
                    <div key={name} className="pb-2.5">
                      <div
                        className={classNames(
                          "relative cursor-pointer px-5 py-2.5 bg-base75 rounded-md flex items-center justify-between w-[300px] h-[60px] max-w-[300px] max-h-[60px]",
                          { "text-base75 bg-base900 font-normal": selected, "text-light50 bg-primary400": active }
                        )}
                        onClick={() => handleClick(name, columnIndex, paths)}
                      >
                        <div className="max-w-[200px]" title={name}>
                          <TextOverflow>{name}</TextOverflow>
                        </div>
                        <TooltipPopup label={`${~~column.dropOff}%`} disabled={!selected}>
                          <div className="rounded-md px-2.5 py-1.5 bg-base200" title={totalCount}>
                            {formatLongNumber(totalCount)}
                          </div>
                        </TooltipPopup>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
