import { 
  Input,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button, } from "@nextui-org/react"
import SearchIcon_v from "../Icons/SearchIcon_v2 "
import { ChevronDownIcon } from "../Icons/ChevronDownIcon "
import { capitalize } from "../../utils/utils"
import React from "react"
import AddUsersModal from "./AddUsersModal"

function TopContent(props) {
  const { 
    filterValue, 
    onSearchChange, 
    setFilterValue,
    statusFilter,
    setStatusFilter,
    statusOptions,
    visibleColumns,
    setVisibleColumns,
    users,
    columns,
    setUsers,
    onRowsPerPageChange

  } = props
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={<SearchIcon_v className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <AddUsersModal setUsers={setUsers}/>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {users.length} Usuarios
        </span>
        {/* <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label> */}
      </div>
    </div>
  )
}


const MemorizeTopContent = React.memo(TopContent)
export default MemorizeTopContent