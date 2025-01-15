import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z, } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { createBoardAtom } from "@/state/board";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, now, parseAbsoluteToLocal, parseDate } from "@internationalized/date";
export default function CreateBoardModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    const { toast } = useToast()
    const [, createBoard] = useAtom(createBoardAtom)
    const formSchema = z.object({
        title: z.string()
            .min(3, {
                message: "Name must be at least 2 characters.",
            }),
        validTill: z.string()
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            title: '',
            validTill: now(getLocalTimeZone()).add({weeks:1}).toDate().toISOString()
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createBoard(values).then((resp) => {
            toast({
                title: 'Success',
                description: resp.message,
            })
            return true
        }).catch(e => {
            toast({
                title: 'Failure',
                description: e.message,
                variant: 'destructive'
            })
            return false
        }).then((success) => {
            if (success) {
                form.reset()
                onOpenChange(false)
            }
        })
    }
    return <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        motionProps={{
            initial: { y: 300, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 300, opacity: 0 },
            transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">New board</ModalHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ModalBody>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <FormField
                                    control={form.control}
                                    name="validTill"
                                    render={({ field }) => (<FormItem>
                                        <FormLabel>Valid Till</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                hideTimeZone
                                                value={field.value?parseAbsoluteToLocal(field.value):now(getLocalTimeZone()).add({weeks:1})} onChange={(newValue) => { if (newValue) field.onChange(newValue.toDate().toISOString()) }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="secondary" onClick={(e) => {
                                    form.reset()
                                    onClose()
                                    e.preventDefault()
                                }}>
                                    Cancel
                                </Button>
                                <Button color="primary">
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </Form>
                </>
            )}
        </ModalContent>
    </Modal>;
}