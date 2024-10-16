import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTable } from 'react-table';

interface ReactTableNoPaginationProps {
  columns: any[];
  data: any[];
  striped?: boolean;
}

const ReactTableNoPagination = ({ columns, data, striped }: ReactTableNoPaginationProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column: any) => (
              <TableCell
                {...column.getHeaderProps([{ className: column.className }])}
                key={column.id}
              >
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell: any) => (
                <TableCell
                  {...cell.getCellProps([{ className: cell.column.className }])}
                  key={cell.value}
                >
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ReactTableNoPagination;
