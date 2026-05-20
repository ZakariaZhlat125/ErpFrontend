'use client';

import { ReactNode, useMemo, useState, useCallback } from 'react';
import { Table, TableProps as AntTableProps, Input, Tag, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Column<T> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  hidden?: boolean;
  exportable?: boolean;
  copyable?: boolean;
  tooltip?: boolean;
}

export interface Action<T> {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (record: T) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  show?: (record: T) => boolean;
  disabled?: (record: T) => boolean;
  tooltip?: string;
  confirm?: { title: string; description?: string };
}

export interface PaginationConfig {
  enabled?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showTotal?: boolean;
  showQuickJumper?: boolean;
  position?: ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight')[];
  total?: number;
  current?: number;
}

export interface SearchConfig {
  enabled?: boolean;
  placeholder?: string;
  searchFields?: string[];
}

export interface SelectionConfig<T> {
  enabled?: boolean;
  type?: 'checkbox' | 'radio';
  onChange?: (selectedKeys: React.Key[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
}

export interface ExpandableConfig<T> {
  enabled?: boolean;
  expandedRowRender?: (record: T, index: number) => ReactNode;
  rowExpandable?: (record: T) => boolean;
}

export interface ExportConfig {
  enabled?: boolean;
  fileName?: string;
  onExport?: (data: any[]) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  loading?: boolean;
  onRowClick?: (record: T) => void;
  idField?: keyof T;
  emptyMessage?: string;

  // New dynamic features
  title?: ReactNode;
  subtitle?: ReactNode;
  toolbar?: ReactNode;
  headerExtra?: ReactNode;
  footer?: ReactNode;

  pagination?: boolean | PaginationConfig;
  search?: boolean | SearchConfig;
  selection?: boolean | SelectionConfig<T>;
  expandable?: ExpandableConfig<T>;
  exportConfig?: ExportConfig;

  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  striped?: boolean;
  sticky?: boolean;
  scroll?: { x?: number | string; y?: number | string };

  onRefresh?: () => void;
  onChange?: AntTableProps<T>['onChange'];
  rowClassName?: (record: T, index: number) => string;

  actionsColumnTitle?: string;
  actionsColumnWidth?: number | string;
  actionsColumnFixed?: 'left' | 'right' | false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function defaultCellRender(value: any): ReactNode {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean')
    return <Tag color={value ? 'green' : 'red'}>{value ? 'Yes' : 'No'}</Tag>;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function matchesSearch<T extends Record<string, any>>(
  record: T,
  term: string,
  fields?: string[],
): boolean {
  const lower = term.toLowerCase();
  const keys = fields ?? Object.keys(record);
  return keys.some((k) => {
    const v = record[k];
    if (v === null || v === undefined) return false;
    return String(v).toLowerCase().includes(lower);
  });
}

function exportToCsv<T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  fileName = 'export',
) {
  const exportCols = columns.filter((c) => c.exportable !== false && !c.hidden);
  const header = exportCols.map((c) => c.title).join(',');
  const rows = data.map((row) =>
    exportCols
      .map((c) => {
        const val = c.dataIndex ? row[c.dataIndex as string] : '';
        const str = val === null || val === undefined ? '' : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(','),
  );
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  loading = false,
  onRowClick,
  idField = 'id' as keyof T,
  emptyMessage = 'No data available',

  title,
  subtitle,
  toolbar,
  headerExtra,
  footer,

  pagination = false,
  search = false,
  selection,
  expandable,
  exportConfig,

  size = 'middle',
  bordered = false,
  striped = false,
  sticky = false,
  scroll,

  onRefresh,
  onChange,
  rowClassName,

  actionsColumnTitle = 'Actions',
  actionsColumnWidth = 150,
  actionsColumnFixed = false,
}: DataTableProps<T>) {
  // ----- state -----
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // ----- normalise config objects -----
  const paginationCfg: PaginationConfig | false = useMemo(() => {
    if (pagination === false) return false;
    if (pagination === true) return { enabled: true, pageSize: 10, showSizeChanger: true, showTotal: true };
    return { enabled: true, pageSize: 10, showSizeChanger: true, showTotal: true, ...pagination };
  }, [pagination]);

  const searchCfg: SearchConfig | false = useMemo(() => {
    if (search === false) return false;
    if (search === true) return { enabled: true, placeholder: 'Search…' };
    return { enabled: true, placeholder: 'Search…', ...search };
  }, [search]);

  const selectionCfg: SelectionConfig<T> | false = useMemo(() => {
    if (!selection) return false;
    if (selection === true) return { enabled: true, type: 'checkbox' as const };
    return { enabled: true, type: 'checkbox' as const, ...selection };
  }, [selection]);

  // ----- filtered data -----
  const filteredData = useMemo(() => {
    if (!searchCfg || !searchTerm) return data;
    return data.filter((r) => matchesSearch(r, searchTerm, searchCfg.searchFields));
  }, [data, searchTerm, searchCfg]);

  // ----- build Ant columns -----
  const antColumns: AntTableProps<T>['columns'] = useMemo(() => {
    const cols = columns
      .filter((c) => !c.hidden)
      .map((column) => {
        const col: any = {
          key: String(column.key),
          title: column.title,
          dataIndex: column.dataIndex ? String(column.dataIndex) : undefined,
          width: column.width,
          align: column.align || 'left',
          fixed: column.fixed,
          ellipsis: column.ellipsis
            ? column.tooltip
              ? { showTitle: false }
              : true
            : false,
        };

        // Render
        if (column.render) {
          col.render = column.render;
        } else if (column.tooltip) {
          col.render = (value: any) => (
            <Tooltip title={value}>
              <span>{defaultCellRender(value)}</span>
            </Tooltip>
          );
        } else {
          col.render = (_v: any, _r: T, _i: number) => defaultCellRender(_v);
        }

        // Sorting
        if (column.sortable) {
          col.sorter = (a: T, b: T) => {
            const aVal = column.dataIndex ? a[column.dataIndex as string] : '';
            const bVal = column.dataIndex ? b[column.dataIndex as string] : '';
            if (typeof aVal === 'number' && typeof bVal === 'number') return aVal - bVal;
            return String(aVal ?? '').localeCompare(String(bVal ?? ''));
          };
        }

        // Filtering via column dropdown
        if (column.filterable && column.filterOptions) {
          col.filters = column.filterOptions.map((o) => ({ text: o.label, value: o.value }));
          col.onFilter = (value: string, record: T) =>
            String(column.dataIndex ? record[column.dataIndex as string] : '') === value;
        }

        return col;
      });

    // Actions column
    if (actions && actions.length > 0) {
      cols.push({
        key: 'actions',
        title: actionsColumnTitle,
        width: actionsColumnWidth,
        align: 'center' as const,
        fixed: actionsColumnFixed || undefined,
        render: (_: any, record: T) => (
          <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            {actions
              .filter((action) => !action.show || action.show(record))
              .map((action) => {
                const isDisabled = action.disabled?.(record) ?? false;
                const btn = (
                  <Button
                    key={action.key}
                    variant={action.variant || 'ghost'}
                    size="sm"
                    onClick={() => action.onClick(record)}
                    title={action.label}
                    disabled={isDisabled}
                  >
                    {action.icon || action.label}
                  </Button>
                );
                return action.tooltip ? (
                  <Tooltip key={action.key} title={action.tooltip}>
                    {btn}
                  </Tooltip>
                ) : (
                  btn
                );
              })}
          </div>
        ),
      });
    }

    return cols;
  }, [columns, actions, actionsColumnTitle, actionsColumnWidth, actionsColumnFixed]);

  // ----- row selection -----
  const rowSelection = useMemo(() => {
    if (!selectionCfg) return undefined;
    return {
      type: selectionCfg.type ?? ('checkbox' as const),
      selectedRowKeys,
      onChange: (keys: React.Key[], rows: T[]) => {
        setSelectedRowKeys(keys);
        selectionCfg.onChange?.(keys, rows);
      },
      getCheckboxProps: selectionCfg.getCheckboxProps,
    };
  }, [selectionCfg, selectedRowKeys]);

  // ----- pagination -----
  const antPagination = useMemo(() => {
    if (!paginationCfg) return false as const;
    return {
      pageSize: paginationCfg.pageSize,
      pageSizeOptions: paginationCfg.pageSizeOptions?.map(String) ?? ['10', '20', '50', '100'],
      showSizeChanger: paginationCfg.showSizeChanger,
      showQuickJumper: paginationCfg.showQuickJumper,
      showTotal: paginationCfg.showTotal ? (total: number) => `Total ${total} items` : undefined,
      position: paginationCfg.position,
      total: paginationCfg.total,
      current: paginationCfg.current,
    };
  }, [paginationCfg]);

  // ----- expandable -----
  const antExpandable = useMemo(() => {
    if (!expandable?.enabled) return undefined;
    return {
      expandedRowRender: expandable.expandedRowRender,
      rowExpandable: expandable.rowExpandable,
    };
  }, [expandable]);

  // ----- handlers -----
  const handleExport = useCallback(() => {
    if (exportConfig?.onExport) {
      exportConfig.onExport(filteredData);
    } else {
      exportToCsv(filteredData, columns, exportConfig?.fileName);
    }
  }, [filteredData, columns, exportConfig]);

  // ----- render -----
  const showToolbar = title || subtitle || searchCfg || toolbar || headerExtra || exportConfig?.enabled || onRefresh;

  return (
    <div className="datatable-wrapper w-full">
      {showToolbar && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 mb-4">
          {/* Left side: title / subtitle */}
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            {title && <div className="text-lg font-semibold">{title}</div>}
            {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
          </div>

          {/* Right side: search + toolbar + extras */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {searchCfg && (
              <Input
                prefix={<SearchOutlined />}
                placeholder={searchCfg.placeholder}
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60"
              />
            )}
            {toolbar}
            {exportConfig?.enabled && (
              <Tooltip title="Export CSV">
                <Button variant="secondary" size="sm" onClick={handleExport}>
                  <DownloadOutlined />
                </Button>
              </Tooltip>
            )}
            {onRefresh && (
              <Tooltip title="Refresh">
                <Button variant="secondary" size="sm" onClick={onRefresh}>
                  <ReloadOutlined />
                </Button>
              </Tooltip>
            )}
            {headerExtra}
          </div>
        </div>
      )}

      {/* Selection summary */}
      {selectionCfg && selectedRowKeys.length > 0 && (
        <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-blue-50 text-sm">
          <span className="font-medium">{selectedRowKeys.length} item(s) selected</span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRowKeys([])}>
            Clear
          </Button>
        </div>
      )}

      {/* Responsive table container with horizontal scroll */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <Table<T>
          columns={antColumns}
          dataSource={filteredData}
          rowKey={(record) => String(record[idField])}
          loading={loading}
          size={size}
          bordered={bordered}
          sticky={sticky}
          scroll={scroll || { x: 'max-content' }}
          pagination={antPagination}
          rowSelection={rowSelection as any}
          expandable={antExpandable}
          onChange={onChange}
          onRow={(record) => ({
            onClick: onRowClick ? () => onRowClick(record) : undefined,
            style: { cursor: onRowClick ? 'pointer' : 'default' },
          })}
          rowClassName={(record, index) => {
            const custom = rowClassName?.(record, index) ?? '';
            const stripe = striped && index % 2 === 1 ? 'bg-gray-50' : '';
            return `${stripe} ${custom}`.trim();
          }}
          locale={{
            emptyText: (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-400">{emptyMessage}</p>
              </div>
            ),
          }}
          footer={footer ? () => <>{footer}</> : undefined}
        />
      </div>
    </div>
  );
}
