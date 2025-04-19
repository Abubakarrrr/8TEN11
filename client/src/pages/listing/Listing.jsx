import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;
const category = ["Free", "Premium"];

export default function Listing() {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const navigate = useNavigate();
  const location = useLocation(); // To get the current URL and query params

  const fetchcourses = async (page, mealType, category) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("limit", limit.toString());

      if (category) queryParams.append("category", category);

      const url = `${BASE_URL}/api/meal/v1/get-all-courses?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data) {
        setCourses(data.courses);
        setTotalPages(data.totalPages); // Set total pages for pagination
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Sync URL with selected filters and page number
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    if (selectedCategory) params.set("category", selectedCategory);

    navigate({
      pathname: "/listing",
      search: params.toString(), // Updates the query params
    });
  }, [currentPage, selectedCategory, navigate]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    if (filterType === "category") {
      setSelectedCategory(value);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Course</h2>
      <div className="flex flex-col justify-end md:flex-row gap-4 mb-8">
        {/* Category Filter */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-sm font-medium">Category</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48 justify-between">
                {selectedCategory ? selectedCategory : "Select Category"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {category.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {courses.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">No courses found</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((meal) => (
          <ListingCard key={meal.title} meal={meal} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-8">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="my-auto">{currentPage}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
