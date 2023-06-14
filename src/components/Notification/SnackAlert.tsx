import { Snackbar, Alert } from '@mui/material';

interface SnackAlertProp {
    open: boolean,
    onClose: () => void,
    title: string
}

export function SnackAlert(props: SnackAlertProp) {
    const { open, onClose, title } = props
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open} autoHideDuration={3000} onClose={onClose}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
}