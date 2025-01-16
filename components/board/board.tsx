'use client'

import { useToast } from "@/hooks/use-toast"
import { getSingleBoard, wish } from "@/services/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z, } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

export default function Board({ id }: { id: string }) {
    const [wishes, setWishes] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [board, setBoard] = useState<null | any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { toast } = useToast()
    useEffect(() => {
        getSingleBoard(id).then(resp => {
            setBoard(resp.data)
            setWishes(resp.data.wishes)
            setLoading(false)
        }).catch(e => {
            setError(e.message)
            setLoading(false)
        })
    }, [])
    const formSchema = z.object({
        salutation: z.string()
            .min(3, {
                message: "Salutation must be at least 2 characters.",
            }),
        wish: z.string()
            .min(3, {
                message: "Wish must be at least 2 characters.",
            }),
        from: z.string()
            .min(3, {
                message: "From must be at least 2 characters.",
            }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salutation: '',
            wish: '',
            from: ''
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        wish({ ...values, boardId: id }).then((resp) => {
            setWishes((old) => [...old, resp.data])
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
            }
        })
    }
    return error ? <div>
        {error}
    </div> : (loading ? <div>Loading...</div> : (board ?
        <div className="flex flex-col items-center justify-center gap-2 p-2 border bg-white text-black">
            <div className="text-2xl font-semibold">{board.title}</div>
            <div><span>Created by:</span> <span className="font-semibold">{board.createdBy.username}</span></div>
            <div className="flex flex-row items-center justify-center flex-wrap gap-2">
                {
                    wishes && wishes.map((wish: any) => <div key={wish.id} className="w-[300px] border p-2 h-full">
                        <div>{wish.salutation},</div>
                        <div>{wish.wish}</div>
                        <div>From: {wish.from}</div>
                    </div>)
                }
                
            </div>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] border p-2 flex flex-col gap-2 bg-green-500 text-white">
                        <div>Your Wish</div>
                        <FormField
                            control={form.control}
                            name="salutation"
                            render={({ field }) => (<FormItem>
                                <FormControl>
                                    <Input placeholder="Salutation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <FormField
                            control={form.control}
                            name="wish"
                            render={({ field }) => (<FormItem>
                                <FormControl>
                                    <Textarea placeholder="Wish" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (<FormItem>
                                <FormControl>
                                    <Input placeholder="From" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <Button type="submit" color="primary">Wish</Button>
                    </form>
                </Form>


        </div> : <></>))
}