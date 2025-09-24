import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDivisionQuery } from "@/redux/features/Division/division.api";
import { useRemoveTourTypeMutation } from "@/redux/features/TourType/tourType.api";
import type { IDivision } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
export default function AddDivision() {
  const { data, isLoading } = useGetAllDivisionQuery(undefined);
  console.log(data);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleDeleteTourType = async (id: string) => {
    try {
      toast.loading("Removing...");
      const res = await removeTourType(id).unwrap();
      toast.dismiss();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to remove tour type.");
      console.log(error);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-auto max-w-7xl border-muted border p-2 rounded-2xl w-full">
      <div className="flex items-center justify-between my-5 px-2">
        <h1 className="text-xl font-semibold">Division Add</h1>
        <AddDivisionModal></AddDivisionModal>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item: IDivision) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <img className="w-12" src={item?.thumbnail} />
              </TableCell>
              <TableCell>
                <DeleteConfirmation
                  onConfirm={() => handleDeleteTourType(item?._id as string)}
                >
                  <Button>
                    <Trash2></Trash2>
                  </Button>
                </DeleteConfirmation>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
