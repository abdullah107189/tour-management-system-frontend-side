import DeleteConfirmation from "@/components/DeleteConfirmation";
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
import {
  useGetAllTourTypeQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/TourType/tourType.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
export default function AddTourType() {
  const { data, isLoading } = useGetAllTourTypeQuery(undefined);
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
                <DeleteConfirmation
                  onConfirm={() => handleDeleteTourType(item._id)}
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
