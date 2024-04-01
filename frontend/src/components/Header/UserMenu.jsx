import { useMemo } from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, DropdownSection} from "@nextui-org/react";
import Logout from "../Auth/Logout";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../utils/constants";
import AvatarIcon from '../Icons/AvatarIcon'
import { Link } from "wouter";
import useRoles from "../../hooks/useRoles";
import React from 'react';

function UserMenuComponent() {
  const { user } = useAuth()
  const { isAuthenticated } = useRoles()

  const userMenu = useMemo(() => (
    <User
      as="button"
      avatarProps={{
        src: user?.avatar
          ? BASE_URL + '/' + user?.avatar
          : undefined,
        fallback: !user?.avatar && 
          <AvatarIcon 
            className="animate-pulse w-6 h-6 text-default-500" 
            fill="currentColor" 
            size={20} 
          />
      }}
      className="transition-transform"
      description={'@' + user?.full_name}
      name={user?.email}
    />
  ), [user?.avatar, user?.email, user?.full_name])

  if(!isAuthenticated || isAuthenticated == undefined) return null
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          { userMenu }
        </DropdownTrigger>
         <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
            textValue="User"
          >
            <User
              description={'@' + user?.full_name}
              name={user?.email}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                src: user?.avatar
                  ? BASE_URL + '/' + user.avatar
                  : undefined,
                fallback: !user?.avatar && 
                  <AvatarIcon 
                    className="animate-pulse w-6 h-6 text-default-500" 
                    fill="currentColor" 
                    size={20} 
                  />
              }}
            />
          </DropdownItem>
          <DropdownItem key="settings" textValue="Profile">
            <Link to="/perfil" className="w-full flex">
              Mi Perfil
            </Link>
          </DropdownItem>
        </DropdownSection> 

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback" textValue="Help">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" textValue="Logout">
            <Logout/>
          </DropdownItem>
        </DropdownSection> 
      </DropdownMenu>
      </Dropdown>
    </div>
  )
}


const UserMenu = React.memo(UserMenuComponent)
export default UserMenu