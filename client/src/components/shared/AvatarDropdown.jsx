import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function AvatarDropdown() {
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  const dashboardLink = user?.role === "admin" ? "/admin" : "/user";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatar} alt="@shadcn" />
          <AvatarFallback>
            {" "}
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link to={dashboardLink}>Dashboard</Link>
        </DropdownMenuItem>
        <Link to="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
