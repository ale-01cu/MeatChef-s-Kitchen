import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
} from "@nextui-org/react";
import MemoizedBottomContent from "../components/User/BottomContent";
import MemorizeTopContent from "../components/User/TopContent";
import { listUsers } from '../services/user'
import { BASE_URL } from "../utils/constants";
import UserDelete from "../components/User/UserDelete";
import UpdateUsersModal from "../components/User/UpdateUsersModal";

const statusOptions = [
  {name: "Activo", uid: "active"},
  {name: "Inactivo", uid: "inactive"},
];

const ROLES_COLOR_MAP = {
  Admin: 'secondary',
  Dependiente: 'primary',
  Profesor: 'warning',
  Cliente: 'default',
}


const INITIAL_VISIBLE_COLUMNS = [
  'id', 
  "email", 
  'phone_number', 
  "role", 
  'status', 
  "actions"
];

const COLUMNS = [
  {name: "ID", uid: "id"},
  {name: "NOMBRE", uid: "full_name"},
  {name: "TELEFONO", uid: "phone_number"},
  {name: "CORREO", uid: "email"},
  {name: "ROL", uid: "role"},
  {name: "ESTADO", uid: "status"},
  {name: "fECHA DE REGISTRO", uid: "createAt"},
  {name: "ACCIONES", uid: "actions"},
]

export default function Users() {
  const [ users, setUsers ] = useState([])
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  // Cantidad de paginas
  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return COLUMNS;

    return COLUMNS.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filterValue.toLowerCase()) || 
        user.full_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      const status = Array.from(statusFilter)[0]
      if(status === 'active') {
        filteredUsers = filteredUsers
          .filter((user) => user.is_active);
      }
      
      if(status === 'inactive') {
        filteredUsers = filteredUsers
          .filter((user) => !user?.is_active);
      }
      // filteredUsers = filteredUsers.filter((user) =>
      //   Array.from(statusFilter).includes(user.status),
      // );
    }

    return filteredUsers
  }, [users, filterValue, statusFilter, hasSearchFilter]);

  const statusColorMap = useCallback((status) => status ? 'success' : 'danger', [])
  const roleMap = useCallback((user) => {
    const roles = []

    if(user.is_superuser) {
      roles.push('Admin')
    }
    if(user.is_staff) {
      roles.push('Dependiente')

    }
    if(user.is_teacher) {
      roles.push('Profesor')

    }
    if(!user.is_superuser && !user.is_staff && !user.is_teacher) {
      roles.push('Cliente')
    }

    return roles

  }, [])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "email":
        return (
          <User
            avatarProps={{radius: "full", size: "sm", src: BASE_URL + '/' + user.avatar}}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex gap-x-2">
            {
              roleMap(user).map((role) => (
                <Chip 
                  key={role} 
                  className="text-bold text-small capitalize" 
                  color={ROLES_COLOR_MAP[role]}
                >
                  {role}
                </Chip>
              ))
            }
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap(user?.is_active)}
            size="sm"
            variant="dot"
          >
            {
              user?.is_active
                ? 'ACTIVO'
                : 'INACTIVO'
            }
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <UpdateUsersModal userId={user?.id} setUsers={setUsers}/>
            <UserDelete itemId={user?.id} setUsers={setUsers}/>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  useEffect(() => {
    listUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {

      })
  }, [])


  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <div className="">
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={(
          <MemoizedBottomContent
            selectedKeys={selectedKeys}
            items={items}
            hasSearchFilter={hasSearchFilter}
            page={page}
            pages={pages}
            setPage={setPage}
          />
        )}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={(
          <MemorizeTopContent
            filterValue={filterValue}
            onSearchChange={onSearchChange}
            setFilterValue={setFilterValue}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            statusOptions={statusOptions}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            users={items}
            columns={COLUMNS}
            setUsers={setUsers}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        )}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </div>
  );
}
