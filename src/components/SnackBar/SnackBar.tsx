import { Snackbar } from "@mui/material";
import { useState } from "react";

const SnackBarComponent: React.FC = () => {

    const [abrir, SetAbrir] = useState(false);

    const abrirSnack = () => {
        SetAbrir(true);
    };

    const fecharSnack = () => {
        SetAbrir(false);
    };

  return (
    <div>
        <button onClick={abrirSnack}>teste</button>
        <Snackbar
        open={abrir}
        message="teste"
        onClose={fecharSnack}
        autoHideDuration={3000}
        />
    </div>
  );
};

export default SnackBarComponent;
