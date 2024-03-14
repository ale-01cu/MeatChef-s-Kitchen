import {
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button } from "@nextui-org/react";
import MenuPublicationIcon from "./MenuPublicationIcon";
import { Link } from "wouter";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function CardMenu(props) {
  const { 
    course_id, 
    handleclickDelete, 
    courseIsActive, 
    textModalDelete } = props
  
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light"
          className="px-unit-2 min-w-unit-0" 
        >
          <MenuPublicationIcon/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        variant="faded" 
        aria-label="Dropdown menu with icons"
        onClose={null}
      >
        <DropdownItem key="get" textValue="ver">
          <Link to={'/cursos/' + course_id} className="pr-36">
            Ver
          </Link>
        </DropdownItem>

        <DropdownItem key="put" textValue="editar">
          <Link to={'/cursos/editar/' + course_id} className="pr-36">
            Editar
          </Link>
        </DropdownItem>

        {
          courseIsActive 
            && <DropdownItem key="delete" textValue="eliminar">
                <ConfirmDeleteModal
                  text={textModalDelete}
                  handleclickDelete={handleclickDelete}
                />
              </DropdownItem>
        }
        
      </DropdownMenu>
    </Dropdown>
  )
}