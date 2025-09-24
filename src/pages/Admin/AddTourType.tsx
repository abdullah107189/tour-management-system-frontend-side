import AddTourTypeModal from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTourTypeQuery } from "@/redux/features/TourType/tourType.api";
import { Trash2 } from "lucide-react";
export default function AddTourType() {
  const { data, isLoading } = useGetAllTourTypeQuery(undefined);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleDeleteTourType = (id: string) => {
    console.log(id);
  };
  console.log(data);
  return (
    <div className="mx-auto max-w-7xl border-muted border p-2 rounded-2xl w-full">
      <div className="flex items-center justify-between my-5 px-2">
        <h1 className="text-xl font-semibold">Tour Type Add</h1>

        <AddTourTypeModal></AddTourTypeModal>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item: { name: string; _id: string }) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex justify-end">
                <Button onClick={() => handleDeleteTourType(item._id)}>
                  <Trash2></Trash2>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
