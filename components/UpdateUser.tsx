
import { useUpdateUserMutation } from "@/lib/features/users/usersApiSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FormEvent, FormEventHandler, useState } from "react";

interface Props {
    user: User;
}

export default function UpdateUserForm(props: Props) {
    const { user } = props
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser({ id: user.id, data: { name, email } });
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Edit
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update User</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    );
};