import {
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button } from "@nextui-org/react";
import MenuPublicationIcon from "./MenuPublicationIcon";
import CourseFormModal from './CourseFormModal'
import { Link } from "wouter";

export default function CardMenu({course_id, handleclickDelete, courseIsActive}) {
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
                <button 
                  onClick={() => handleclickDelete(course_id)} 
                  className="w-full text-left"
                >
                  Eliminar
                </button>
              </DropdownItem>
        }
        
      </DropdownMenu>
    </Dropdown>
  )
}