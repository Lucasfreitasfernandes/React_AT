import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';

const DatePickerComponent: React.FC = () => {
  return (
    <LocalizationProvider
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                label="Data"
                />
                </DemoContainer>
            </LocalizationProvider>
  );
};

export default DatePickerComponent;
