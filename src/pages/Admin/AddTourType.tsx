import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function AddTourType() {
  return (
    <div className="mx-auto max-w-7xl border-muted border p-2 rounded-2xl w-full">
      <div className="flex items-center justify-between my-5 px-5">
        <h1 className="text-xl font-semibold">Tour Type Add</h1>
        <Button>ADD</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
