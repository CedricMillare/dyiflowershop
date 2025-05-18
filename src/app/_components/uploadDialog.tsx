import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

export function UploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-zinc-500">Change Display Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
    
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
